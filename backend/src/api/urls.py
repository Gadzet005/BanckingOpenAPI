from django.urls import path
from .views import UserTransactionsView

urlpatterns = [
    path('transactions/', UserTransactionsView.as_view(), name='all_transactions'),
]