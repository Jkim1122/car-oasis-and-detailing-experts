from django.urls import path
from .views import Cart_manager, Cart_item_quantity, Delete_item, Checkout

urlpatterns = [
    # api/cart/
    path('', Cart_manager.as_view(), name = "cart"),
    path('<int:item_id>/', Cart_manager.as_view(), name="cart_manager"),
    path('<str:method>/cart_item/<int:cart_item_id>/', Cart_item_quantity.as_view(), name = "cart_item_quantity"),
    path('delete/<int:cart_item_id>/', Delete_item.as_view(), name = "delete_item"),
    path("checkout/", Checkout.as_view(), name='checkout'),
]