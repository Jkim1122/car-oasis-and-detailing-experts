from rest_framework.serializers import ModelSerializer
from .models import Client

class ClientSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = ['email', 'full_name', 'number']
        