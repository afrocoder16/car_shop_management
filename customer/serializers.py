from rest_framework import serializers
from .models import Customer, Notification
from service.models import Appointment, Payment  # Import Payment model

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

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
