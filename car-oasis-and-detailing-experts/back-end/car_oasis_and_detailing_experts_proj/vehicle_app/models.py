from django.db import models
from user_app.models import Client
# Create your models here.
class Vehicle(models.Model):
    vin = models.CharField(max_length=254, unique=True, blank=False, default='no VIN provided')
    year = models.IntegerField()
    make = models.CharField(max_length=254)
    model = models.CharField(max_length=254)
    image_url = models.URLField(max_length=254, default="Sowwy, no IMG")
    client_id = models.IntegerField()