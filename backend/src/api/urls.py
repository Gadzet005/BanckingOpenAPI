from django.urls import path
from .views import UserTransactionsView, UserAccountsView, UpdateAccountVisibilityView

urlpatterns = [
    path('transactions/', UserTransactionsView.as_view(), name='all_transactions'),
    path('accounts/', UserAccountsView.as_view(), name='all_transactions'),
    path('changevisbility/<int:account_id>', UpdateAccountVisibilityView.as_view(), name='chage_visibility'),
]