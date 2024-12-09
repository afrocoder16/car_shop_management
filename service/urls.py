from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AppointmentViewSet, 
    ServiceTypeViewSet, 
    create_appointment,
    get_car_progress,
    get_recent_repairs,
    get_payment_summary
)

# Router setup for viewsets
router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointments')
router.register(r'service-types', ServiceTypeViewSet, basename='service-types')

urlpatterns = [
    path('', include(router.urls)),  # Include routes for viewsets
    path('create-appointment/', create_appointment, name='create_appointment'),  # Custom appointment creation endpoint
    path('car-progress/', get_car_progress, name='get_car_progress'),  # Endpoint for car progress tracker
    path('recent-repairs/', get_recent_repairs, name='get_recent_repairs'),  # Endpoint for recent repairs
    path('payment-summary/', get_payment_summary, name='get_payment_summary'),  # Endpoint for payment summary
]
