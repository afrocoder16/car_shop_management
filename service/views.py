from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Appointment, ServiceType
from .serializers import AppointmentSerializer, ServiceTypeSerializer
from customer.models import Customer  # Import Customer model for foreign key

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class ServiceTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceType.objects.all()
    serializer_class = ServiceTypeSerializer

@api_view(['POST'])
def create_appointment(request):
    data = request.data
    customer_id = data.get('customer')  # Assume frontend sends the customer ID
    service_type_id = data.get('service_type')  # Assume frontend sends the service type ID

    try:
        # Get the customer object
        customer = Customer.objects.get(id=customer_id)
        # Get the service type object
        service_type = ServiceType.objects.get(id=service_type_id)

        # Create the appointment
        appointment_data = {
            'appointment_date': data.get('date'),
            'status': 'Pending',  # Default status
            'customer': customer.id,
            'service_type': service_type.id,
        }
        serializer = AppointmentSerializer(data=appointment_data)
        if serializer.is_valid():
            appointment = serializer.save()
            return Response({"message": "Appointment created successfully", "appointment_id": appointment.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Customer.DoesNotExist:
        return Response({"error": "Customer does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except ServiceType.DoesNotExist:
        return Response({"error": "Service type does not exist"}, status=status.HTTP_404_NOT_FOUND)
