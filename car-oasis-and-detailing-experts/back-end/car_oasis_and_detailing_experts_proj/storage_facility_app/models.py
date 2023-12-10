from django.db import models

# Create your models here.
class Storage_facility(models.Model):
    name = models.CharField()
    parking_spaces = models.PositiveIntegerField()
    info = models.CharField()