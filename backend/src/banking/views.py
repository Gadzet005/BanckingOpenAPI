from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_datetime
from django.http import JsonResponse
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json
from .models import Bank, Account, Transaction, UserBank

class TransactionWebhookAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        
        bank_code = data.get('bank_code')
        account_code = data.get('account_code')
        amount = data.get('amount')
        type = data.get('type')
        description = data.get('description')
        date_str = data.get('date')
        bank_user_id = data.get('user_id')
        balance = data.get('balance')
        
        if not all([bank_code, account_code, amount, type]):
            return Response({"error": "Нет всех обязательных полей"}, status=status.HTTP_400_BAD_REQUEST)

        date = parse_datetime(date_str) if date_str else None

        try:
            bank = Bank.objects.get(bank_code=bank_code)
        except Bank.DoesNotExist:
            return Response({"error": "Банк не найден"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            userbank = UserBank.objects.get(bank_id=bank, bank_user_id = bank_user_id)
        except:
            return Response({"error": "Банк не найден!"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            account = Account.objects.get(bank_id=bank, account_code=account_code, user_id=userbank.user_id)
        except Account.DoesNotExist:
            return Response({"error": "Счет не найден"}, status=status.HTTP_404_NOT_FOUND)
        
        if Transaction.objects.filter(account_id=account, amount=amount, type=type, description=description, date=date).exists():
            return Response({"error": "Такой объект транзакции уже существует"}, status=status.HTTP_400_BAD_REQUEST)

        transaction = Transaction.objects.create(
            account_id=account,
            amount=amount,
            type=type,
            description=description,
            date=date
        )
        userbank.date = date
        userbank.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'transactions',
            {
                'type': 'send_transaction',
                'bank_name': bank.name,
                'bank_code': bank_code,
                'account_code': account.account_code,
                'amount': amount,
                'transaction_type': type,
                'description': description,
                'balance': balance,
                'date': date.strftime("%Y-%m-%d %H:%M:%S") if date else None,
                'user_id': account.user_id.id
            }
        )

        return Response({"status": "Транзакция создана", "transaction_id": transaction.id}, status=status.HTTP_201_CREATED)
