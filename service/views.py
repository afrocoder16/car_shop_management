from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import logging

from .models import Appointment, ServiceType
from .serializers import AppointmentSerializer, ServiceTypeSerializer
from customer.models import Customer

logger = logging.getLogger(__name__)

class AppointmentViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for appointments.
    Filters appointments by the authenticated user.
    """
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            try:
                customer = Customer.objects.get(user=user)
                return Appointment.objects.filter(customer=customer)
            except Customer.DoesNotExist:
                return Appointment.objects.none()
        return Appointment.objects.none()


class ServiceTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides a read-only view for service types.
    """
    queryset = ServiceType.objects.all()
    serializer_class = ServiceTypeSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can create appointments
def create_appointment(request):
    """
    Creates a new appointment for the authenticated user.
    """
    try:
        # Get the customer linked to the authenticated user
        user = request.user
        customer = Customer.objects.get(user=user)

        # Extract data from the request
        service_type_id = request.data.get('service_type')
        appointment_date = request.data.get('appointment_date')

        # Validate request data
        if not service_type_id or not appointment_date:
            return Response(
                {"detail": "Service type and appointment date are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate service type
        try:
            service_type = ServiceType.objects.get(id=service_type_id)
        except ServiceType.DoesNotExist:
            return Response(
                {"detail": "Service type not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Log the creation attempt
        logger.info(f"Creating appointment for customer {customer.id} on {appointment_date}.")

        # Create the appointment
        appointment_data = {
            "customer": customer.id,
            "service_type": service_type.id,
            "appointment_date": appointment_date,
            "status": "Pending",  # Default status
        }
        serializer = AppointmentSerializer(data=appointment_data)
        if serializer.is_valid():
            appointment = serializer.save()
            logger.info(f"Appointment created successfully for customer {customer.id}.")
            return Response(
                {
                    "detail": "Appointment created successfully.",
                    "appointment": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        logger.warning(f"Validation errors while creating appointment: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Customer.DoesNotExist:
        logger.error(f"Customer profile not found for user {request.user.id}.")
        return Response(
            {"detail": "Customer profile not found for the user."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        logger.exception("An unexpected error occurred while creating an appointment.")
        return Response(
            {"detail": f"An unexpected error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_car_progress(request):
    """
    Fetch car progress tracker data for the authenticated user.
    """
    try:
        user = request.user
        customer = Customer.objects.get(user=user)

        appointments = Appointment.objects.filter(customer=customer).order_by('appointment_date')
        data = {
            "in_progress": appointments.filter(status="In Progress").values(),
            "completed": appointments.filter(status="Completed").values(),
            "pending": appointments.filter(status="Pending").values(),
        }
        return Response(data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response(
            {"detail": "Customer profile not found for the user."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        logger.exception("Error fetching car progress data.")
        return Response(
            {"detail": f"An unexpected error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recent_repairs(request):
    """
    Fetch recent repairs for the authenticated user.
    """
    try:
        user = request.user
        customer = Customer.objects.get(user=user)

        repairs = Appointment.objects.filter(
            customer=customer, status="Completed"
        ).order_by('-appointment_date')[:5]  # Fetch recent 5 repairs

        return Response(repairs.values(), status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response(
            {"detail": "Customer profile not found for the user."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        logger.exception("Error fetching recent repairs.")
        return Response(
            {"detail": f"An unexpected error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_payment_summary(request):
    """
    Fetch payment summary for the authenticated user.
    """
    try:
        user = request.user
        customer = Customer.objects.get(user=user)

        payments = customer.payments.order_by('-payment_date')[:5]  # Fetch recent 5 payments
        return Response(payments.values(), status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response(
            {"detail": "Customer profile not found for the user."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        logger.exception("Error fetching payment summary.")
        return Response(
            {"detail": f"An unexpected error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
