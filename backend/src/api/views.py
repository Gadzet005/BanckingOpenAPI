from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from banking.models import Transaction, Account
from .serializers import TransactionSerializer

class UserTransactionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_accounts = Account.objects.filter(user_id=request.user)
        transactions = Transaction.objects.filter(account_id__in=user_accounts)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
