from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet, ServiceTypeViewSet, create_appointment

# Router setup for viewsets
router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointments')
router.register(r'service-types', ServiceTypeViewSet, basename='service-types')

urlpatterns = [
    path('', include(router.urls)),  # Include routes for viewsets
    path('create-appointment/', create_appointment, name='create_appointment'),  # Custom appointment creation endpoint
]
