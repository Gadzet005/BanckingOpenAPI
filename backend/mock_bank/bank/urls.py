from django.urls import path
from .views import MakeTransaction

urlpatterns = [
    path(
        'make_transaction/',
        MakeTransaction.as_view(),
        name='make_transaction'
    ),
]
