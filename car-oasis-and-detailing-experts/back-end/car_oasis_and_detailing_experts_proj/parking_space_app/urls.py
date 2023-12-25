from django.urls import path
from .views import Parking_space_manager, ParkingSpaceDetail

urlpatterns = [
    # api/parking_spaces
    path('', Parking_space_manager.as_view(), name='parking_space_manager'),
    path('<int:pk>/', ParkingSpaceDetail.as_view(), name='parking_space_detail'),
]
