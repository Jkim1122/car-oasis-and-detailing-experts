from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import Item, ItemSerializer
from cart_app.serializers import Cart_item
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
# Create your views here.
import requests
from requests_oauthlib import OAuth1

class All_items(APIView):
    def get(self, request):
        items = ItemSerializer(Item.objects.all(), many=True)
        return Response(items.data)
    
class An_item(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        items = ItemSerializer(Item.objects.get(id=id))
        return Response(items.data)
    
    def post(self, request, id):
        try:
            item = Item.objects.get(id=id)
        except Item.DoesNotExist:
            return Response({"error": f"Item with id {id} not found"}, status=HTTP_404_NOT_FOUND)

        # Get the client's cart
        cart = request.user.cart

        # Check if the item is already in the cart (including soft-deleted items)
        existing_cart_item = Cart_item.objects.filter(item=item, cart=cart, is_active=False).first()

        if existing_cart_item:
            # If the item is soft-deleted, create a new Cart_item
            new_cart_item = Cart_item.objects.create(item=item, cart=cart)
            return Response(f'{item.name} has been added back to your cart with a new ID ({new_cart_item.pk})', status=HTTP_201_CREATED)
        else:
            # If the item is not in the cart or is not soft-deleted, create a new Cart_item
            cart_item = Cart_item.objects.create(item=item, cart=cart)
            return Response(f'{item.name} has been added to your cart with a new ID ({cart_item.pk})', status=HTTP_201_CREATED)
        
    def delete(self, request, id):
        try:
            print(request.user.cart.cart_items.all())
            item = Item.objects.get(id=id)
            cart_item = request.user.cart.cart_items.get(item=item)
            cart_item.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Item.DoesNotExist:
            return Response({"error": f"Item with id {id} not found"}, status=HTTP_404_NOT_FOUND)
        
class Item_by_category(APIView):
    def get(self, request, category):
        items = ItemSerializer(Item.objects.filter(category__iexact=category), many=True)
        print(items)
        return Response(items.data)
    
class Icons(APIView):
    def get(self, request, icon_id):
        key = '803a54e0b3814d11960eeeb704fa8b94';
        secret_key = '6d7239e298284dc0a0ca921d25e2cb98';
        
        auth = OAuth1(key, secret_key)
        endpoint = f'https://api.thenounproject.com/v2/icon/{icon_id}'

        response = requests.get(endpoint, auth=auth)
        print(response.content)
        return Response(response.json())