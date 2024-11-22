from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Customer
from .serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


@api_view(['POST'])
def create_or_get_customer(request):
    email = request.data.get('email')
    vin_number = request.data.get('vin_number')
    license_plate = request.data.get('license_plate')

    # Check if a customer with the same email, VIN, or license plate exists
    customer = Customer.objects.filter(
        email=email, vin_number=vin_number, license_plate=license_plate
    ).first()

    if customer:
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # If no customer exists, create a new one
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
