from django.urls import path

from proxy.views import HelloView

urlpatterns = [
    path("hello", HelloView.as_view()),
]
