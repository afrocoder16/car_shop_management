# Generated by Django 5.1.2 on 2024-11-22 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0002_customer_car_make_customer_car_model_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='address',
            field=models.TextField(blank=True, null=True),
        ),
    ]
