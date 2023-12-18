from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import Vehicle, VehicleSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
# Create your views here.
class All_vehicles(APIView):
    def get(self, request, client_id):
        vehicle_list = Vehicle.objects.filter(client_id=client_id)
        serialized_list = []
        for item in vehicle_list:
            # print(VehicleSerializer(item).data)
            serialized_list.append(VehicleSerializer(item).data)
        # print(serialized_list)
        return Response(serialized_list)
    

class Vehicle_manager(APIView):
    def post(self, request):
        # vehicle = request.user.vehicle
        print(request.data)
        # vin = request.data['vin']
        # year = request.data['vin']
        # vin = request.data['vin']
        # vin = request.data['vin']
        vehicle = Vehicle.objects.create(vin=request.data['vin'],
                                         year=request.data['year'],
                                         make=request.data['make'],
                                         model=request.data['model'],
                                         image_url=request.data['image_url'],
                                         client_id=request.data['client_id'])
        return Response('vehicle added', status=HTTP_201_CREATED)
    
class Delete_vehicle(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, vehicle_id):
        # try:
        vehicle = Vehicle.objects.get(pk=vehicle_id)
        print(vehicle)
        #     return Response({"message": "Vehicle was removed from client's vehicle list"} status=HTTP_204_NO_CONTENT)
        # except Vehicle.DoesNotExist:
        #     return Response({"error": f"Vehicle with vin {request.vin} not found"}, status=HTTP_404_NOT_FOUND)