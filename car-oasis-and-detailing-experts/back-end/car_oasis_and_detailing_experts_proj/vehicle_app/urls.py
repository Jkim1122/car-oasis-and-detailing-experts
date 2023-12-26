from django.urls import path
from .views import All_vehicles, Vehicle_manager, Delete_vehicle
urlpatterns = [
    # "api/vehicles"
    path("<int:client_id>/", All_vehicles.as_view(), name='all_vehicles'),
    path("add_vehicle/", Vehicle_manager.as_view(), name='vehicle_manager'),
    path("update_vehicle/<int:id>/", Vehicle_manager.as_view(), name='update_vehicle'),
    path("delete_vehicle/<int:id>/", Delete_vehicle.as_view(), name='delete_vehicle'),
    
    # path("logout/", Log_out.as_view(), name='logout'),
]