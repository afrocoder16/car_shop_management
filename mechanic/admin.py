from django.contrib import admin
from service.models import Service  # Import Service model
from .models import Mechanic  # Import Mechanic model

class ServiceInline(admin.TabularInline):
    model = Service
    extra = 1  # Allows adding new services inline

@admin.register(Mechanic)
class MechanicAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialization', 'experience', 'availability_hours', 'overtime_allowed')  # Display mechanic details
    search_fields = ('name', 'specialization')  # Enable search by name and specialization
    list_filter = ('specialization', 'overtime_allowed', 'days_off')  # Filters to narrow down mechanics by specialization and schedule
    inlines = [ServiceInline]  # Inline services handled by the mechanic

# If you want to register the Service model separately for other purposes, it can be done here (already assumed to be in service/admin.py)
