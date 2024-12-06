# Generated by Django 5.1.2 on 2024-12-06 16:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0005_remove_appointment_appointment_time_and_more'),
        ('service', '0003_alter_appointment_customer_payment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_payments', to='customer.customer'),
        ),
    ]
