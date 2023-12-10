from django.db import models
from user_app.models import Client
# Create your models here.
class Vehicle(models.Model):
    year = models.IntegerField()
    make = models.CharField()
    model = models.CharField()
    color = models.CharField()
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="vehicle")