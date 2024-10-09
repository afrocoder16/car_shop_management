from django.db import models

# Create your models here.
from django.db import models

class Mechanic(models.Model):
    name = models.CharField(max_length=100)
    experience = models.IntegerField()
    specialization = models.CharField(max_length=100)

    def __str__(self):
        return self.name
