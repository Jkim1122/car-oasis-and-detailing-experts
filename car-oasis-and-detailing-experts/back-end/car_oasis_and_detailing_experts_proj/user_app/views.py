from django.shortcuts import render
from rest_framework.authtoken.models import Token
from .serializers import Client, ClientSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_204_NO_CONTENT
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.http import HttpResponse
from cart_app.models import Cart
# Create your views here.
class Sign_up(APIView):
    def post(self, request):
        try:
            data = request.data.copy()
            data['username'] = request.data['email']
            new_user = Client.objects.create_user(**data)
            
            cart = Cart.objects.create(client=new_user)
            new_token = Token.objects.create(user = new_user)
            return Response({"client":new_user.email, "token": new_token.key}, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response('sum went wrong', status=HTTP_400_BAD_REQUEST)
        
class Log_in(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']

            user = authenticate(username=email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user = user)
                return Response({'client':user.email, 'token':token.key})
            return Response('sum went wrong', status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response('sum went wrong', status=HTTP_400_BAD_REQUEST)
class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Info(UserPermissions):
    def get(self, request):
        user = ClientSerializer(request.user)
        return Response(user.data)

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete() #token class, related name
        return Response(status=HTTP_204_NO_CONTENT)

# def index(request):
#     return HttpResponse(open('static/index.html'))