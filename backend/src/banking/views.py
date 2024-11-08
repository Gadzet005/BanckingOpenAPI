from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_datetime
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Bank, Account, Transaction

class TransactionWebhookAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        
        bank_code = int(data.get('bank_code'))
        account_code = int(data.get('account_code'))
        amount = int(data.get('amount'))
        date_str = data.get('date')
        balance = int(data.get('balance'))
        subtype = data.get('category')
        
        if not all([bank_code, account_code, amount, date_str, balance, subtype]):
            print([bank_code, account_code, amount, date_str, balance, subtype])
            return Response({"error": f"Нет всех обязательных полей {[bank_code, account_code, amount, date_str, balance, subtype]}"}, status=status.HTTP_400_BAD_REQUEST)

        date = parse_datetime(date_str) if date_str else None

        if amount<0:
            type = 'expense'
        else:
            type = 'income'
        amount = abs(amount)
        try:
            bank = Bank.objects.get(bank_code=bank_code)
        except Bank.DoesNotExist:
            print("WASD")
            return Response({"error": "Банк не найден"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            account = Account.objects.get(bank_id=bank, account_code=account_code)
        except Account.DoesNotExist:
            print(bank, account_code)
            return Response({"error": "Счет не найден"}, status=status.HTTP_404_NOT_FOUND)
        
        # if Transaction.objects.filter(account_id=account, amount=amount, type=type, date=date, subtype=subtype).exists():
        #     return Response({"error": "Такой объект транзакции уже существует"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            transaction = Transaction.objects.create(
                account_id=account,
                amount=amount,
                type=type,
                date=date,
                subtype=subtype
            )
        except:
            transaction = Transaction.objects.create(
                account_id=account,
                amount=amount,
                type=type,
                date=date,
                subtype="transfer"
            )
        if not account.isHide:
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
                    'transaction_subtype': subtype,
                    'balance': balance,
                    'date': date.strftime("%Y-%m-%d %H:%M:%S") if date else None,
                    'user_id': account.user_id.id
                }
            )

        return Response({"status": "Транзакция создана", "transaction_id": transaction.id}, status=status.HTTP_201_CREATED)
