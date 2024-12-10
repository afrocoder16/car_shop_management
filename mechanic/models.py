from django.db import models

class Mechanic(models.Model):
    # Basic Information
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)  # Mechanic’s area of expertise (e.g., brakes, engines)
    experience = models.IntegerField()  # Years of experience

    # Work Schedule
    availability_hours = models.CharField(max_length=100)  # The hours a mechanic is available (e.g., 9 AM - 5 PM)
    days_off = models.CharField(max_length=50, blank=True, null=True)  # Regular days off (e.g., weekends)
    overtime_allowed = models.BooleanField(default=False)  # Whether the mechanic is allowed to work overtime

    # Certifications
    certifications = models.CharField(max_length=255, blank=True, null=True)  # List of certifications (e.g., ASE Certified)
    training_courses = models.CharField(max_length=255, blank=True, null=True)  # Additional courses the mechanic has completed

    # Relationship to Services
    # A mechanic can handle multiple services (One-to-Many with the Service model)
    # This relationship will be managed by the Service model linking back to the Mechanic

    def __str__(self):
        return self.name
