from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Customer
from .serializers import CustomerSerializer
from django.core.mail import send_mail
from django.conf import settings


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

    # Check if the customer already exists by email, VIN, or license plate
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

    # Create a new customer
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        customer = serializer.save()

        # Send an email confirmation for local testing
        send_account_creation_email(customer.email, customer.name)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def sign_up(request):
    """
    Allows new users to sign up for an account.
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if the username or email already exists
    if User.objects.filter(username=username).exists():
        return Response({"detail": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"detail": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = User.objects.create_user(username=username, email=email, password=password)
    token, _ = Token.objects.get_or_create(user=user)

    # Optionally, link the User to a Customer record (if needed)
    return Response({"token": token.key, "detail": "Account created successfully."}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
    """
    Authenticates a user and returns their token.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout(request):
    """
    Logs out the user by deleting their token.
    """
    if request.auth:
        request.auth.delete()
        return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)
    else:
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
        [user_email],  # Recipient's email
        fail_silently=False,
    )
