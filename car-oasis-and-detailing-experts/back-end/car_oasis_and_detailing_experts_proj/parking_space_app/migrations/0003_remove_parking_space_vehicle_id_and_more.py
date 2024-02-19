# Generated by Django 4.2.3 on 2023-12-24 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking_space_app', '0002_rename_dates_reserved_parking_space_booking_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='parking_space',
            name='vehicle_id',
        ),
        migrations.AlterField(
            model_name='parking_space',
            name='booking_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='parking_space',
            name='is_reserved',
            field=models.BooleanField(default=True),
        ),
    ]