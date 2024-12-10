from django.contrib import admin
from service.models import Service  # Import Service model
from .models import Customer, Notification, UserProfile  # Import Customer, Notification, and UserProfile models

class ServiceInline(admin.TabularInline):
    model = Service
    extra = 1  # Allows adding a new service inline

class NotificationInline(admin.TabularInline):
    model = Notification
    extra = 1  # Allows adding new notifications inline

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number', 'car_make', 'car_model', 'membership_level')  # Include car and membership info
    search_fields = ('name', 'email', 'phone_number', 'car_make', 'car_model')  # Enable search by car details
    inlines = [ServiceInline, NotificationInline]  # Add Service and Notification as inline models
    list_filter = ('membership_level', 'preferred_service_time')  # Add filters for membership and service time

# Register Notification separately if needed
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('customer', 'notification_type', 'send_date')
    search_fields = ('customer__name', 'message')
    list_filter = ('notification_type', 'send_date')

# Register UserProfile
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')  # Display these fields in the admin list view
    list_filter = ('role',)  # Add filter options for roles
