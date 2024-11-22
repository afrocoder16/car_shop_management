from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet, ServiceTypeViewSet, create_appointment

router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet)
router.register(r'service-types', ServiceTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Existing ViewSet routes
    path('create/', create_appointment, name='create_appointment'),  # New custom endpoint
]
