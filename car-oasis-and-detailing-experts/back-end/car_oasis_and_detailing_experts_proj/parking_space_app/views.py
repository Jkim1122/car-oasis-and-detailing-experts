from django.shortcuts import render
from user_app.views import UserPermissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from cart_app.models import Cart, Cart_item
from parking_space_app.serializers import Parking_spaceSerializer, Parking_space
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
# Create your views here.

class Parking_space_manager(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        parking_spaces = Parking_space.objects.all()
        serializer = Parking_spaceSerializer(parking_spaces, many=True)
        return Response(serializer.data)

    # def post(self, request):
    #     print(request.data)
    #     serializer = Parking_spaceSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def post(self, request):
        serializer = Parking_spaceSerializer(data=request.data)
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ParkingSpaceDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Parking_space.objects.get(pk=pk)
        except Parking_space.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        parking_space = self.get_object(pk)
        serializer = Parking_spaceSerializer(parking_space)
        return Response(serializer.data)

    def put(self, request, pk):
        parking_space = self.get_object(pk)
        serializer = Parking_spaceSerializer(parking_space, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        parking_space = self.get_object(pk)
        parking_space.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
