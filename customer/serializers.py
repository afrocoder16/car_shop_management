from rest_framework import serializers
from .models import Customer, Notification
from service.models import Appointment, Payment  
from django.contrib.auth.models import User

class CustomerSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)  

    class Meta:
        model = Customer
        fields = '__all__'
        extra_fields = ['first_name', 'last_name', 'email']  

    def create(self, validated_data):
        user_data = validated_data.pop('user', None)  
        user = User.objects.create(**user_data)
        user.set_password(user_data.get('password'))
        user.save()
        customer = Customer.objects.create(user=user, **validated_data)
        return customer

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.user.get_full_name', read_only=True)
    service_type_name = serializers.CharField(source='service_type.name', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Payment
        fields = '__all__'
