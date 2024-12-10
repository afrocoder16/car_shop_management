from django.db import models
from django.contrib.auth.models import User  # For linking Customer to User

class Customer(models.Model):
    """
    Stores customer details.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)  # Link to User model
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    address = models.TextField(blank=True, null=True)

    car_make = models.CharField(max_length=50, default="Unknown")
    car_model = models.CharField(max_length=50, default="Unknown")
    car_year = models.IntegerField(default=2000)
    vin_number = models.CharField(max_length=15, blank=True, null=True)  # Removed unique constraint
    license_plate = models.CharField(max_length=15, blank=True, null=True)  # Removed unique constraint
    loyalty_points = models.IntegerField(default=0)
    membership_level = models.CharField(max_length=50, blank=True, null=True)
    preferred_service_time = models.CharField(max_length=50, blank=True, null=True)
    emergency_contact = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    """
    Tracks appointments for car services.
    """
    appointment_date = models.DateField()  # Date the appointment is scheduled
    customer = models.ForeignKey(
        'customer.Customer',  # Use a string reference instead of importing the model
        on_delete=models.CASCADE,
        related_name='appointments'
    )
    service_type = models.ForeignKey(
        'service.ServiceType',  # Use a string reference to avoid circular import
        on_delete=models.CASCADE,
        related_name='appointments'
    )
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Confirmed', 'Confirmed'), ('Cancelled', 'Cancelled')])

    def __str__(self):
        return f"Appointment on {self.appointment_date} for {self.customer.name}"


class Payment(models.Model):
    """
    Tracks payments made by customers.
    """
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_payments')
    payment_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, choices=[
        ('Credit Card', 'Credit Card'),
        ('Debit Card', 'Debit Card'),
        ('Cash', 'Cash'),
        ('Online', 'Online'),
    ])
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Payment of {self.amount} by {self.customer.name}"


class Notification(models.Model):
    """
    Notification Model for sending notifications to customers.
    """
    message = models.TextField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='notifications')
    send_date = models.DateTimeField(auto_now_add=True)
    notification_type = models.CharField(max_length=20, choices=[('Email', 'Email'), ('SMS', 'SMS')])

    def __str__(self):
        return f"Notification to {self.customer.name} on {self.send_date}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('mechanic', 'Mechanic'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')

    def __str__(self):
        return f"{self.user.username} - {self.role}"
