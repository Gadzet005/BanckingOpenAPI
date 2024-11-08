from django.urls import path
from .views import UserTransactionsView, UserAccountsView

urlpatterns = [
    path('transactions/', UserTransactionsView.as_view(), name='all_transactions'),
    path('accounts/', UserAccountsView.as_view(), name='all_transactions'),
]