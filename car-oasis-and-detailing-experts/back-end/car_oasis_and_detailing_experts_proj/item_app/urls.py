from django.urls import path
from .views import All_items, Item_by_category, An_item, Icons

urlpatterns = [
    path('', All_items.as_view(), name='all_items'),
    path('category/<str:category>/', Item_by_category.as_view(), name='items_by_category'),
    path('<int:id>/', An_item.as_view(), name='an_item'),
    path('icons/<int:icon_id>/', Icons.as_view(), name='icons'),
]
