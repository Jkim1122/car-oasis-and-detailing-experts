from django.urls import path
from .views import All_vehicles, Vehicle_manager
urlpatterns = [
    # "api/vehicles"
    path("<int:client_id>/", All_vehicles.as_view(), name='all_vehicles'),
    path("add_vehicle/", Vehicle_manager.as_view(), name='vehicle_manager'),
    # path("signup/", Sign_up.as_view(), name='signup'),
    # path("login/", Log_in.as_view(), name='login'),
    # path("logout/", Log_out.as_view(), name='logout'),
]