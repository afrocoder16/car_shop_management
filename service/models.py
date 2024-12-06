from django.db import models
from customer.models import Customer  
from mechanic.models import Mechanic  

class ServiceType(models.Model):
    name = models.CharField(max_length=100)  
    description = models.TextField()  
    base_price = models.DecimalField(max_digits=10, decimal_places=2)  

    def __str__(self):
        return self.name


class PartInventory(models.Model):
    part_name = models.CharField(max_length=100)  
    quantity = models.IntegerField() 
    price = models.DecimalField(max_digits=10, decimal_places=2)  
    supplier = models.CharField(max_length=100)  

    def __str__(self):
        return self.part_name


class Service(models.Model):
    service_type = models.ForeignKey(ServiceType, on_delete=models.CASCADE) 
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')])
    service_date = models.DateField() 
    completion_date = models.DateField(blank=True, null=True)  

    
    total_cost = models.DecimalField(max_digits=10, decimal_places=2) 
    payment_status = models.CharField(max_length=20, choices=[('Paid', 'Paid'), ('Unpaid', 'Unpaid')])  
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2)  
    invoice_number = models.CharField(max_length=50, unique=True) 
    parts_used = models.ManyToManyField(PartInventory) 
    labor_hours = models.DecimalField(max_digits=5, decimal_places=2)  

    
    priority = models.CharField(max_length=10, choices=[('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')])  
    service_notes = models.TextField(blank=True, null=True)  
    estimated_completion_time = models.TimeField(blank=True, null=True)  

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
    customer = models.ForeignKey(
        Customer, 
        on_delete=models.CASCADE, 
        related_name="service_appointments"  # Add a unique related_name
    )  # Customer scheduling the appointment
    service_type = models.ForeignKey(ServiceType, on_delete=models.CASCADE)  # Type of service being booked
    status = models.CharField(
        max_length=20, 
        choices=[('Pending', 'Pending'), ('Confirmed', 'Confirmed'), ('Cancelled', 'Cancelled')]
    )  # Appointment status

    def __str__(self):
        return f"Appointment on {self.appointment_date} for {self.customer.name}"



class Payment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    payment_status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Completed', 'Completed')])

    def __str__(self):
        return f"Payment {self.id} - {self.amount} ({self.payment_status})"