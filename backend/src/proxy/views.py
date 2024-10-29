from rest_framework.views import APIView
from rest_framework.response import Response


# Для теста, потом удалим!
class HelloView(APIView):
    def get(self, request, format=None):
        return Response({"message": "Hello, World!"})
