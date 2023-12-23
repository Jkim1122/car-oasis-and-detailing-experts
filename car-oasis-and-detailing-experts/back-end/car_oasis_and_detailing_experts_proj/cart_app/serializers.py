from rest_framework.serializers import ModelSerializer, SerializerMethodField
from item_app.serializers import ItemSerializer
from item_app.models import Item
from .models import Cart, Cart_item

class CartItemSerializer(ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = Cart_item
        fields = ['id', 'quantity', 'item','is_active']

class CartSerializer(ModelSerializer):
    total_price = SerializerMethodField()
    cart_items = CartItemSerializer(many=True)
    class Meta:
        model = Cart
        fields = ['cart_items', 'total_price', 'client']

    def get_total_price(self, obj):
        cart_items = obj.cart_items.all()
        total_price = round(sum(item.quantity * item.item.price for item in cart_items), 2)

        return total_price