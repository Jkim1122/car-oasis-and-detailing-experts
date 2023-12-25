from django.shortcuts import render
from user_app.views import UserPermissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from cart_app.models import Cart, Cart_item
from cart_app.serializers import CartSerializer, CartItemSerializer
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
# Create your views here.
class Cart_manager(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the client's cart
        cart = request.user.cart
        cart_items = cart.cart_items.filter(is_active=True).order_by('id')

        # Serialize the cart for the response
        serializer = CartSerializer(cart)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, item_id):
        # Get the client's cart
        cart = request.user.cart
        cart_items = cart.cart_items.all().order_by('id')
        # Check if the item is already in the cart
        existing_cart_item = cart.cart_items.filter(item_id=item_id).first()

        if existing_cart_item:
            # If the item is already in the cart, update its quantity
            existing_cart_item.quantity += 1
            existing_cart_item.save()
        else:
            # If the item is not in the cart, create a new cart item
            cart_item = Cart_item.objects.create(cart=cart, item_id=item_id, quantity=1)

        # Serialize the cart for the response
        serializer = CartSerializer(cart)

        return Response(serializer.data, status=status.HTTP_200_OK)

class Cart_item_quantity(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_cart_item(self, cart_item_id, request_user):
        try:
            return Cart_item.objects.get(pk=cart_item_id, cart__client=request_user)
        except Cart_item.DoesNotExist:
            return None

        
    def put(self, request, method, cart_item_id, *args, **kwargs): #chatgpt
        # print(f"Method: {method}")
        # print(f"Cart Item ID: {cart_item_id}")
        if method not in ['add', 'sub']:
            return Response({"error": "Invalid method argument. Use 'add' or 'sub'."}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = self.get_cart_item(cart_item_id, request.user.id)
        if not cart_item:
            return Response({"error": f"Cart item with id {cart_item_id} not found"}, status=status.HTTP_404_NOT_FOUND)

        if method == 'add':
            # Increment quantity
            cart_item.quantity += 1
        elif method == 'sub':
            # Decrement quantity
            cart_item.quantity -= 1

            if cart_item.quantity <= 0:
                # If quantity reaches 0 or less, delete the Cart Item
                cart_item.delete()
                return Response({"message": "Cart item deleted"}, status=status.HTTP_204_NO_CONTENT)

        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

# class Delete_item(APIView):
class Delete_item(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_item_id):
        # print(request.user.id)
        try:
            cart_item = Cart_item.objects.get(pk=cart_item_id, cart__client=request.user)
            # print(cart_item)
            cart_item.delete()  # Remove the Cart_item from the cart (not from the database)
            return Response({"message": "Cart item removed from the cart"}, status=HTTP_204_NO_CONTENT)
        except Cart_item.DoesNotExist:
            return Response({"error": f"Cart item with id {cart_item_id} not found"}, status=HTTP_404_NOT_FOUND)
