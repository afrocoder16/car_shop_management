from django.db import models

class Customer(models.Model):
    
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()

    
    car_make = models.CharField(max_length=50, default="Unknown")
    car_model = models.CharField(max_length=50, default="Unknown")
    car_year = models.IntegerField(default=2000)  
    vin_number = models.CharField(max_length=15, unique=True, default="Unknown")
    license_plate = models.CharField(max_length=15, unique=True, default="Unknown")  
    loyalty_points = models.IntegerField(default=0)  
    membership_level = models.CharField(max_length=50, blank=True, null=True)  
    preferred_service_time = models.CharField(max_length=50, blank=True, null=True) 
    emergency_contact = models.CharField(max_length=100, blank=True, null=True)  

    def __str__(self):
        return self.name

class Notification(models.Model):
    # Notification Model for sending notifications to customers
    message = models.TextField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  # Link to Customer model
    send_date = models.DateTimeField(auto_now_add=True)
    notification_type = models.CharField(max_length=20, choices=[('Email', 'Email'), ('SMS', 'SMS')])

    def __str__(self):
        return f"Notification to {self.customer.name} on {self.send_date}"
