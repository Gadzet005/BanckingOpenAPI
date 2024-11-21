from django.urls import path
from .views import WebhookAPIView

urlpatterns = [
    path("webhook/", WebhookAPIView.as_view(), name="webhook"),
]
