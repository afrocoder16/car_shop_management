from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import Customer, Appointment, Payment
from .serializers import CustomerSerializer, AppointmentSerializer, PaymentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
import logging

logger = logging.getLogger(__name__)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

@api_view(['POST'])
def create_or_get_customer(request):
    email = request.data.get('email')
    vin_number = request.data.get('vin_number')
    license_plate = request.data.get('license_plate')

    existing_customer = Customer.objects.filter(email=email).first() or Customer.objects.filter(
        vin_number=vin_number).first() or Customer.objects.filter(license_plate=license_plate).first()

    if existing_customer:
        return Response({"detail": "Account already exists. Please sign in."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        customer = serializer.save()
        send_account_creation_email(customer.email, customer.name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow access without authentication
def sign_up(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if the email already exists in the User model
    if User.objects.filter(email=email).exists():
        return Response({"detail": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    # Create the User
    user = User(username=email, email=email, first_name=first_name, last_name=last_name)
    user.set_password(password)  # Set the hashed password
    user.save()

    # Check if a Customer with this email already exists
    customer = Customer.objects.filter(email=email).first()
    if not customer:
        # Create a new Customer profile if one doesn't exist
        customer = Customer(user=user, name=f"{first_name} {last_name}", email=email)
        customer.save()
    else:
        # Link the existing Customer to the new user
        customer.user = user
        customer.save()

    # Generate an auth token for the user
    token, _ = Token.objects.get_or_create(user=user)

    return Response({"token": token.key, "detail": "Account created successfully."}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    if user.check_password(password):
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout(request):
    if request.auth:
        request.auth.delete()
        return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)
    return Response({"error": "You are not logged in."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def reset_password(request):
    email = request.data.get('email')

    try:
        user = User.objects.get(email=email)
        new_password = User.objects.make_random_password()
        user.set_password(new_password)
        user.save()

        send_mail(
            'Password Reset',
            f'Your new password is: {new_password}',
            settings.DEFAULT_FROM_EMAIL or 'no-reply@example.com',
            [email],
            fail_silently=False,
        )
        return Response({"detail": "Password reset successful. Check your email for the new password."},
                        status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"detail": "Email not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customer_profile(request):
    try:
        customer = Customer.objects.get(user=request.user)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response({"detail": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_customer_name(request):
    user = request.user
    if user.is_authenticated:
        full_name = f"{user.first_name} {user.last_name}".strip()
        return Response({"name": full_name}, status=status.HTTP_200_OK)
    return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_upcoming_appointments(request):
    try:
        customer = Customer.objects.get(user=request.user)
        upcoming_appointments = Appointment.objects.filter(
            customer=customer, appointment_date__gte=timezone.now()
        ).order_by('appointment_date')
        serializer = AppointmentSerializer(upcoming_appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response({"detail": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_service_history(request):
    try:
        customer = Customer.objects.get(user=request.user)
        service_history = Appointment.objects.filter(customer=customer).order_by('-appointment_date')
        serializer = AppointmentSerializer(service_history, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response({"detail": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_past_payments(request):
    try:
        customer = Customer.objects.get(user=request.user)
        payments = Payment.objects.filter(customer=customer)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response({"detail": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test_token_auth(request):
    return Response({"detail": f"Authenticated as {request.user}"}, status=status.HTTP_200_OK)


def send_account_creation_email(user_email, user_name):
    subject = 'Account Created Successfully'
    message = f"""
    Dear {user_name},

    Your account has been successfully created.
    Thank you for booking with us!

    Regards,
    The Team
    """
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL or 'no-reply@example.com', [user_email], fail_silently=False)
