from django.db import models

# Create your models here.
from django.db import models
from customer.models import Customer
from mechanic.models import Mechanic

class Service(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    mechanic = models.ForeignKey(Mechanic, on_delete=models.CASCADE)
    service_type = models.CharField(max_length=200)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')])
    service_date = models.DateField()

    def __str__(self):
        return f"{self.service_type} - {self.status}"
