from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Customer
from .serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]  # Restrict access to authenticated users


@api_view(['POST'])
def create_or_get_customer(request):
    email = request.data.get('email')
    vin_number = request.data.get('vin_number')
    license_plate = request.data.get('license_plate')

    # Check if a customer with the same email exists
    if Customer.objects.filter(email=email).exists():
        return Response(
            {"detail": "Account already exists. Please sign in."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check if a customer with the same VIN exists
    if Customer.objects.filter(vin_number=vin_number).exists():
        return Response(
            {"detail": "Account already exists. Please sign in."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check if a customer with the same license plate exists
    if Customer.objects.filter(license_plate=license_plate).exists():
        return Response(
            {"detail": "Account already exists. Please sign in."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # If no duplicate customer exists, create a new one
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def sign_up(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"detail": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"detail": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    token, _ = Token.objects.get_or_create(user=user)

    # Optionally link the new User to a Customer record
    return Response({"token": token.key, "detail": "Account created successfully."}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
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
    request.auth.delete()  # Deletes the token, effectively logging out the user
    return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)
