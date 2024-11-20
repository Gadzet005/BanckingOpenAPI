from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_datetime
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Bank, Account, Transaction, PeriodicPayment
from django.contrib.auth import get_user_model

User = get_user_model()

class WebhookAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        event_type = data.get('event_type')
        if event_type == 'transaction':
            bank_code = int(data.get('bank_code'))
            account_code = int(data.get('account_code'))
            amount = int(data.get('amount'))
            date_str = data.get('date')
            balance = int(data.get('balance'))
            subtype = data.get('category')
            
            if not all([bank_code, account_code, amount, date_str, balance, subtype]):
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
                return Response({"error": "Банк не найден"}, status=status.HTTP_404_NOT_FOUND)
            
            try:
                account = Account.objects.get(bank_id=bank, account_code=account_code)
            except Account.DoesNotExist:
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
        elif event_type == "subscribe":
            amount = int(data.get('amount'))
            period = int(data.get('period'))
            period_type = data.get('period_type')
            date_str = data.get('creation_date')
            account_code = int(data.get('account_code'))
            bank_code = int(data.get('bank_code'))
            creator = data.get('creator')
            
            if not all([amount, period, period_type, date_str, account_code, bank_code, creator]):
                return Response({"error": f"Нет всех обязательных полей {[amount, period, period_type, date_str, account_code, bank_code, creator]}"}, status=status.HTTP_400_BAD_REQUEST)

            date = parse_datetime(date_str) if date_str else None

            try:
                bank = Bank.objects.get(bank_code=bank_code)
            except Bank.DoesNotExist:
                return Response({"error": "Банк не найден"}, status=status.HTTP_404_NOT_FOUND)
            
            try:
                account = Account.objects.get(bank_id=bank, account_code=account_code)
            except Account.DoesNotExist:
                return Response({"error": "Счет не найден"}, status=status.HTTP_404_NOT_FOUND)
            payment = PeriodicPayment.objects.create(
                account_id=account,
                amount=amount,
                date=date,
                period=period,
                period_type=period_type,
                creator=creator
            )
            if not account.isHide:
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                    'transactions',
                    {
                        'type': 'send_payment',
                        'bank_name': bank.name,
                        'bank_code': bank_code,
                        'account_code': account.account_code,
                        'amount': amount,
                        'period_type': period_type,
                        'period': period,
                        'date': date.strftime("%Y-%m-%d %H:%M:%S") if date else None,
                        'user_id': account.user_id.id,
                        'creator':creator
                    }
                )

            return Response({"status": "Периодический платеж создан", "periodic_payment_id": payment.id}, status=status.HTTP_201_CREATED)


class CreateTransaction(APIView):
    def post(self, request):
        data = request.data
        bank_code = int(data.get('bank_code'))
        account_code = int(data.get('account_code'))
        phone_number = data.get('phone_number')
        try:
            user = User.objects.get(phone_number=phone_number)
            bank = Bank.objects.get(bank_code=bank_code)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if Account.objects.get(bank_id=bank, account_code=account_code):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            account = Account.objects.create(bank_id=bank, account_code=account_code, user_id=user)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)