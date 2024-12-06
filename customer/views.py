from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import Customer, Appointment, Payment
from .serializers import CustomerSerializer, AppointmentSerializer, PaymentSerializer
from rest_framework.permissions import IsAuthenticated


class CustomerViewSet(viewsets.ModelViewSet):
    """
    Handles customer-related operations (CRUD).
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    # Remove IsAuthenticated to allow unauthenticated users to create accounts
    # permission_classes = [IsAuthenticated]


@api_view(['POST'])
def create_or_get_customer(request):
    """
    Creates a new customer if they do not exist.
    If the customer exists, returns a message prompting them to log in.
    """
    email = request.data.get('email')
    vin_number = request.data.get('vin_number')
    license_plate = request.data.get('license_plate')

    existing_customer = Customer.objects.filter(
        email=email
    ).first() or Customer.objects.filter(
        vin_number=vin_number
    ).first() or Customer.objects.filter(
        license_plate=license_plate
    ).first()

    if existing_customer:
        return Response(
            {"detail": "Account already exists. Please sign in."},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        customer = serializer.save()
        send_account_creation_email(customer.email, customer.name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def sign_up(request):
    """
    Allows new users to sign up for an account.
    """
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if the email already exists
    if User.objects.filter(email=email).exists():
        return Response({"detail": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = User.objects.create_user(username=email, email=email, password=password)
    user.first_name = first_name
    user.last_name = last_name
    user.save()

    token, _ = Token.objects.get_or_create(user=user)

    # Optionally, link the User to a Customer record (if needed)
    return Response({"token": token.key, "detail": "Account created successfully."}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def login(request):
    """
    Logs in a user using email and password.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    if user.check_password(password):
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout(request):
    """
    Logs out the user by deleting their token.
    """
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
        return Response({"detail": "Password reset successful. Check your email for the new password."}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"detail": "Email not found."}, status=status.HTTP_404_NOT_FOUND)


def send_account_creation_email(user_email, user_name):
    """
    Sends an account creation email to the customer.
    """
    subject = 'Account Created Successfully'
    message = f"""
    Dear {user_name},

    Your account has been successfully created.
    Thank you for booking with us!

    Regards,
    The Team
    """
    from_email = settings.DEFAULT_FROM_EMAIL or 'no-reply@example.com'

    send_mail(
        subject,
        message,
        from_email,
        [user_email],
        fail_silently=False,
    )


@api_view(['GET'])
def get_customer_name(request):
    """
    Fetch and return the authenticated customer's name and email.
    """
    user = request.user
    if user.is_authenticated:
        return Response({"name": user.first_name, "email": user.email}, status=200)
    return Response({"detail": "Authentication required."}, status=401)


@api_view(['GET'])
def get_upcoming_appointments(request):
    """
    Fetch and return upcoming appointments for the authenticated customer.
    """
    user = request.user
    if not user.is_authenticated:
        return Response({"detail": "Authentication required."}, status=401)

    customer = Customer.objects.get(user=user)
    upcoming_appointments = Appointment.objects.filter(
        customer=customer,
        appointment_date__gte=timezone.now()
    ).order_by('appointment_date')

    serializer = AppointmentSerializer(upcoming_appointments, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_payment_summary(request):
    """
    Fetch payment history and summary for the authenticated customer.
    """
    user = request.user
    if not user.is_authenticated:
        return Response({"detail": "Authentication required."}, status=401)

    customer = Customer.objects.get(user=user)
    payments = Payment.objects.filter(customer=customer).order_by('-payment_date')

    total_payments = payments.aggregate(total=models.Sum('amount'))['total'] or 0
    last_payment = payments.first()
    average_payment = payments.aggregate(avg=models.Avg('amount'))['avg'] or 0

    payment_summary = {
        "total_payments": total_payments,
        "last_payment": last_payment.amount if last_payment else None,
        "last_payment_date": last_payment.payment_date if last_payment else None,
        "average_payment": average_payment,
    }

    serializer = PaymentSerializer(payments, many=True)
    return Response({"payments": serializer.data, "summary": payment_summary}, status=200)


@api_view(['GET'])
def get_service_history(request):
    """
    Fetch and return the car service history for the authenticated customer.
    """
    user = request.user
    if not user.is_authenticated:
        return Response({"detail": "Authentication required."}, status=401)

    customer = Customer.objects.get(user=user)
    service_history = Appointment.objects.filter(
        customer=customer
    ).order_by('-appointment_date')

    serializer = AppointmentSerializer(service_history, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def get_past_payments(request):
    """
    Fetches past payments for the logged-in customer.
    """
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        customer = Customer.objects.get(user=request.user)
        payments = Payment.objects.filter(customer=customer)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response({"detail": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)
