from django.db import models
from storage_facility_app.models import Storage_facility
# Create your models here.
class Item(models.Model):
    name = models.CharField()
    price = models.IntegerField()
    description = models.CharField()
    category = models.CharField()
    storage_facility_id = models.ForeignKey(Storage_facility, on_delete=models.CASCADE, related_name="storage_facility")
    