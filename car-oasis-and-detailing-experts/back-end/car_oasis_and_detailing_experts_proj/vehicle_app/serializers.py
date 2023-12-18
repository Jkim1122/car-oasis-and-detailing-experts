from rest_framework.serializers import ModelSerializer
from .models import Vehicle

class VehicleSerializer(ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['vin', 'year', 'make', 'model', 'image_url', 'client_id']
        
    def get_total_vehicles(self, obj):
        vehicle_list = Vehicle.objects.all()
        vehicle_list = Vehicle.objects.filter(client_id=obj.data['id'])
        print(Vehicle.objects.count())
        return Vehicle.objects.count()