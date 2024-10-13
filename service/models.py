from django.db import models
from customer.models import Customer  # Assuming Customer model is in customer app
from mechanic.models import Mechanic  # Assuming Mechanic model is in mechanic app

class ServiceType(models.Model):
    name = models.CharField(max_length=100)  # Name of the service (e.g., Oil Change)
    description = models.TextField()  # Short description of the service
    base_price = models.DecimalField(max_digits=10, decimal_places=2)  # Base price for the service

    def __str__(self):
        return self.name


class PartInventory(models.Model):
    part_name = models.CharField(max_length=100)  # Name of the part
    quantity = models.IntegerField()  # Quantity available in stock
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Cost of the part
    supplier = models.CharField(max_length=100)  # Supplier information

    def __str__(self):
        return self.part_name


class Service(models.Model):
    # Basic Information
    service_type = models.ForeignKey(ServiceType, on_delete=models.CASCADE)  # Type of service (from ServiceType model)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')])
    service_date = models.DateField()  # Date service started
    completion_date = models.DateField(blank=True, null=True)  # Date service was completed

    # Cost and Parts
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)  # Total cost of the service
    payment_status = models.CharField(max_length=20, choices=[('Paid', 'Paid'), ('Unpaid', 'Unpaid')])  # Payment status
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2)  # Estimated cost before actual service cost
    invoice_number = models.CharField(max_length=50, unique=True)  # Unique identifier for the invoice
    parts_used = models.ManyToManyField(PartInventory)  # List of parts used in the service
    labor_hours = models.DecimalField(max_digits=5, decimal_places=2)  # Number of labor hours worked on the service

    # Additional Details
    priority = models.CharField(max_length=10, choices=[('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')])  # Job prioritization
    service_notes = models.TextField(blank=True, null=True)  # Mechanic’s notes regarding the service
    estimated_completion_time = models.TimeField(blank=True, null=True)  # Estimated time to finish the service

    # Customer Feedback
    customer_feedback = models.TextField(blank=True, null=True)  # Feedback or comments left by the customer
    rating = models.IntegerField(blank=True, null=True, choices=[(i, str(i)) for i in range(1, 6)])  # Rating out of 5

    # Relationships
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  # Each service is linked to a customer
    mechanic = models.ForeignKey(Mechanic, on_delete=models.CASCADE)  # Each service is assigned to a mechanic

    def __str__(self):
        return f"Service for {self.customer.name} - {self.service_type.name}"


class Appointment(models.Model):
    appointment_date = models.DateField()  # Date the appointment is scheduled
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  # Customer scheduling the appointment
    service_type = models.ForeignKey(ServiceType, on_delete=models.CASCADE)  # Type of service being booked
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Confirmed', 'Confirmed'), ('Cancelled', 'Cancelled')])  # Appointment status

    def __str__(self):
        return f"Appointment on {self.appointment_date} for {self.customer.name}"
