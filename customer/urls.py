from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomerViewSet,
    create_or_get_customer,
    sign_up,
    login,
    logout,
    get_customer_name,  # Correct function name
    get_upcoming_appointments,  # Correct function name
    get_past_payments,  # Correct function name
    get_service_history,  # Correct function name
)

# Default Router for CustomerViewSet
router = DefaultRouter()
router.register(r'customers', CustomerViewSet)

urlpatterns = [
    # Include the router URLs for CustomerViewSet
    path('', include(router.urls)),

    # Custom authentication endpoints
    path('create-or-get-customer/', create_or_get_customer, name='create_or_get_customer'),
    path('sign-up/', sign_up, name='sign_up'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),

    # Customer dashboard-related endpoints
    path('customer-name/', get_customer_name, name='customer_name'),  # Corrected function
    path('upcoming-appointments/', get_upcoming_appointments, name='upcoming_appointments'),  # Corrected function
    path('past-payments/', get_past_payments, name='past_payments'),  # Corrected function
    path('car-service-history/', get_service_history, name='car_service_history'),  # Corrected function
]
