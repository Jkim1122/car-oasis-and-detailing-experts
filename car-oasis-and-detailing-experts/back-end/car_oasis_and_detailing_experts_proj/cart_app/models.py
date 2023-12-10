from django.db import models
from user_app.models import Client
from item_app.models import Item
# Create your models here.
class Cart(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name="cart")
    # cart item by 

class Cart_item(models.Model):
    quantity = models.PositiveIntegerField(default=1)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE) # changed from one to one
    is_active = models.BooleanField(default=False)