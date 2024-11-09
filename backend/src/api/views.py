from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from banking.models import Transaction, Account, UserAccount
from .serializers import TransactionSerializer, AccountSerializer
from django.utils.dateparse import parse_datetime
from rest_framework import status
import requests
from datetime import timedelta

class UserTransactionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        user_accounts = Account.objects.filter(user_id=request.user, isHide=False)

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
            account = Account.objects.get(account_code=account_id, user_id=request.user)
            
            account.isHide = not account.isHide
            account.save()
            if account.isHide:
                try:
                    useraccount = UserAccount.objects.get(user_id=request.user)
                except:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                
                url = "http://bank:5000/unsubscribe/"
                headers = {
                    "Authorization": f"Bearer {useraccount.access_token}"
                }
                data = {
                    "account_number": account.account_code
                }
                response = requests.post(url, headers=headers, data=data)
                if response.status_code == 401:
                    response_token = requests.post(
                                    "http://bank:5000/get_token/",
                                    json={"phone_number": request.user.phone_number,
                                        "bank_code": self.bank_code},
                                    timeout=100
                                )
                    response_data = response_token.json()
                    encoded_jwt = response_data.get("jwt")
                    refresh_token = response_data.get("refresh")
                    useraccount.access_token = encoded_jwt
                    useraccount.save()
                    url = "http://bank:5000/unsubscribe/"
                    headers = {
                        "Authorization": f"Bearer {useraccount.access_token}"
                    }
                    data = {
                        "account_number": account.account_code
                    }
                    response = requests.post(url, headers=headers, data=data)
            else:
                try:
                    useraccount = UserAccount.objects.get(user_id=request.user)
                except:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                
                url = "http://bank:5000/subscribe/"
                headers = {
                    "Authorization": f"Bearer {useraccount.access_token}"
                }
                data = {
                    "account_number": account.account_code,
                    "url": 'http://backend:8000/webhook/transaction/',
                }
                response = requests.post(url, headers=headers, data=data)
                if response.status_code == 401:
                    response_token = requests.post(
                                    "http://bank:5000/get_token/",
                                    json={"phone_number": request.user.phone_number,
                                        "bank_code": self.bank_code},
                                    timeout=100
                                )
                    response_data = response_token.json()
                    encoded_jwt = response_data.get("jwt")
                    refresh_token = response_data.get("refresh")
                    useraccount.access_token = encoded_jwt
                    useraccount.save()
                    url = "http://bank:5000/subscribe/"
                    headers = {
                        "Authorization": f"Bearer {useraccount.access_token}"
                    }
                    data = {
                        "account_number": account.account_code,
                        "url": 'http://backend:8000/webhook/transaction/',
                    }
                    response = requests.post(url, headers=headers, data=data)
                
                transaction_exist = False
                try:
                    transactions = Transaction.objects.get(account_id=account)
                    transaction_exist = True
                    latest_transaction = Transaction.objects.filter(account_id=account).order_by('-date').first()
                except:
                    pass
                if transaction_exist:
                    params = {
                    "account_number": account.account_code,
                    "from": str(latest_transaction.date+timedelta(seconds=1))
                    }
                else:
                    params = {
                        "account_number": account.account_code
                    }
                url = "http://bank:5000/get_transactions/"
                headers = {
                    "Authorization": f"Bearer {useraccount.access_token}"
                }
                response = requests.get(url, headers=headers, params=params)
                if response.status_code == 200:
                    transactions_data = response.json()
                    for transaction_data in transactions_data:
                        if transaction_data["account_to_number"] == account.account_code:
                            try:
                                transaction = Transaction.objects.create(account_id=account,
                                                                        amount=int(transaction_data["quantity"]),
                                                                        date=parse_datetime(transaction_data["date_time"]),
                                                                        type="income",
                                                                        subtype=transaction_data["category"],)
                            except:
                                transaction = Transaction.objects.create(account_id=account,
                                                                        amount=int(transaction_data["quantity"]),
                                                                        date=parse_datetime(transaction_data["date_time"]),
                                                                        type="income",
                                                                        subtype="transfer",)
                        elif transaction_data["account_from_number"] == account.account_code:
                            try:
                                transaction = Transaction.objects.create(account_id=account,
                                                                        amount=int(transaction_data["quantity"]),
                                                                        date=parse_datetime(transaction_data["date_time"]),
                                                                        type="expense",
                                                                        subtype=transaction_data["category"],)
                            except:
                                transaction = Transaction.objects.create(account_id=account,
                                                                        amount=int(transaction_data["quantity"]),
                                                                        date=parse_datetime(transaction_data["date_time"]),
                                                                        type="expense",
                                                                        subtype="transfer",)

            return Response({'success': True, 'isHide': account.isHide}, status=status.HTTP_200_OK)
        
        except Account.DoesNotExist:
            return Response({'error': 'Account not found or does not belong to this user.'},
                            status=status.HTTP_404_NOT_FOUND)

