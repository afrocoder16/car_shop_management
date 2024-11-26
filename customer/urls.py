from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomerViewSet,
    create_or_get_customer,
    sign_up,
    login,
    logout,
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
]
