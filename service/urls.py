from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views 
from .views import (
    AppointmentViewSet, 
    ServiceTypeViewSet, 
    create_appointment,
    get_car_progress,
    get_recent_repairs,
    get_payment_summary,
    get_service_history,
    get_estimated_cost
)

# Router setup for viewsets
router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointments')
router.register(r'service-types', ServiceTypeViewSet, basename='service-types')

urlpatterns = [
    path('appointments/', views.AppointmentViewSet.as_view({'get': 'list', 'post': 'create'}), name='appointments'),
    path('service-types/', views.ServiceTypeViewSet.as_view({'get': 'list'}), name='service-types'),
    path('car-progress/', views.get_car_progress, name='car-progress'),
    path('recent-repairs/', views.get_recent_repairs, name='recent-repairs'),
    path('payment-summary/', views.get_payment_summary, name='payment-summary'),
    path('estimated-cost/', views.get_estimated_cost, name='estimated_cost'),
    path('service-history/', views.get_service_history, name='service-history'),
    path('create-appointment/', views.create_appointment, name='create-appointment'),
    path('payment-history/', views.get_payment_history, name='payment_history'),

]



