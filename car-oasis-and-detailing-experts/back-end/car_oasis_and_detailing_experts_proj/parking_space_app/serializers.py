from rest_framework.serializers import ModelSerializer
from .models import Parking_space

class Parking_spaceSerializer(ModelSerializer):

    class Meta:
        model = Parking_space
        fields = ['id', 'is_reserved', 'client_id', 'booking_date']