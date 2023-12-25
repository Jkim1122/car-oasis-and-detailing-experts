from django.db import models
from user_app.models import Client
from vehicle_app.models import Vehicle
# Create your models here.
class Parking_space(models.Model):
    is_reserved = models.BooleanField(default=True)
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="parking_space")
    # vehicle_id = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="parking_space")
    booking_date = models.DateTimeField(null=True, blank=True)