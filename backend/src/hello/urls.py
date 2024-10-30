from django.urls import path

from hello.views import HelloView

urlpatterns = [
    path("hello", HelloView.as_view()),
]
