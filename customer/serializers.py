from rest_framework import serializers
from .models import Customer, Notification
from service.models import Appointment, Payment  # Import Payment model
from django.contrib.auth.models import User

class CustomerSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Customer
        fields = '__all__'
        extra_fields = ['first_name', 'last_name']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):  # Define PaymentSerializer
    class Meta:
        model = Payment
        fields = '__all__'
