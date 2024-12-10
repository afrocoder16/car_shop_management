from django.contrib import admin
from .models import Service, ServiceType, PartInventory, Appointment

# ServiceType Admin
@admin.register(ServiceType)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_price')  
    search_fields = ('name',)  

# PartInventory Admin
@admin.register(PartInventory)
class PartInventoryAdmin(admin.ModelAdmin):
    list_display = ('part_name', 'quantity', 'price', 'supplier')  
    search_fields = ('part_name', 'supplier')  
    list_filter = ('supplier',)  


# Service Admin
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('customer', 'service_type', 'status', 'service_date', 'completion_date', 'total_cost', 'payment_status')  
    search_fields = ('customer__name', 'service_type__name', 'invoice_number')  
    list_filter = ('status', 'priority', 'payment_status')  
    filter_horizontal = ('parts_used',)  
    fieldsets = (
        (None, {
            'fields': ('customer', 'mechanic', 'service_type', 'status', 'service_date', 'completion_date', 'priority', 'estimated_completion_time')
        }),
        ('Cost & Parts', {
            'fields': ('total_cost', 'estimated_cost', 'payment_status', 'invoice_number', 'parts_used', 'labor_hours')
        }),
        ('Customer Feedback', {
            'fields': ('customer_feedback', 'rating')
        }),
    )


# Appointment Admin
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('appointment_date', 'customer', 'service_type', 'status')  # Display key appointment details
    search_fields = ('customer__name', 'service_type__name')  # Enable search by customer name and service type
    list_filter = ('status',)  # Filter appointments by status (Pending, Confirmed, Cancelled)
