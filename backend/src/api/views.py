from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from banking.models import Transaction, Account
from .serializers import TransactionSerializer, AccountSerializer
from django.utils.dateparse import parse_datetime
from rest_framework import status

class UserTransactionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        user_accounts = Account.objects.filter(user_id=request.user)

        transactions = Transaction.objects.filter(account_id__in=user_accounts)

        if start_date:
            start_date = parse_datetime(start_date)
            if start_date:
                transactions = transactions.filter(date__gte=start_date)
        if end_date:
            end_date = parse_datetime(end_date)
            if end_date:
                transactions = transactions.filter(date__lte=end_date)

        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

class UserAccountsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_accounts = Account.objects.filter(user_id=request.user, isHide=False)
        serializer = AccountSerializer(user_accounts, many=True, context={'request': request})
        return Response(serializer.data)
    
class UpdateAccountVisibilityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, account_id):
        try:
            account = Account.objects.get(id=account_id, user_id=request.user)
            
            account.isHide = not account.isHide
            account.save()

            return Response({'success': True, 'isHide': account.isHide}, status=status.HTTP_200_OK)
        
        except Account.DoesNotExist:
            return Response({'error': 'Account not found or does not belong to this user.'},
                            status=status.HTTP_404_NOT_FOUND)

