from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

from .views import (
    CustomerViewSet,
    create_or_get_customer,
    sign_up,
    login,
    logout,
    get_customer_name,
    get_upcoming_appointments,
    get_past_payments,
    get_service_history,
    test_token_auth,
)

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create-or-get-customer/', create_or_get_customer, name='create_or_get_customer'),
    path('sign-up/', sign_up, name='sign_up'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('customer-name/', get_customer_name, name='customer_name'),
    path('get-customer-name/', views.get_customer_name, name='get_customer_name'),
    path('upcoming-appointments/', get_upcoming_appointments, name='upcoming_appointments'),
    path('past-payments/', get_past_payments, name='past_payments'),
    path('car-service-history/', get_service_history, name='car_service_history'),
    path('test-auth/', test_token_auth, name='test_auth'),
]
