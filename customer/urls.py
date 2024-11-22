from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, create_or_get_customer

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create-or-get-customer/', create_or_get_customer, name='create-or-get-customer'),
]
