# Generated by Django 5.1.2 on 2024-12-09 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0004_alter_payment_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
    ]
