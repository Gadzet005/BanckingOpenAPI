from django.urls import path
from .views import TransactionWebhookAPIView

urlpatterns = [
    path('webhook/transaction/', TransactionWebhookAPIView.as_view(), name='transaction_webhook'),
]