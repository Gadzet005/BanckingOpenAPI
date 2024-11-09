from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction, IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from jwt import encode, decode, ExpiredSignatureError
from requests import post
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import User, Subscriptions, Account, Bank, Transaction
from datetime import datetime, timedelta

import json


class AuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        phone_number = json.loads(request.body).get('phone_number')
        is_new = json.loads(request.body).get('new') == 'True'
        bank_code = json.loads(request.body).get('bank_code')

        if phone_number:
            try:
                user = User.objects.get(phone_number=phone_number)

                encoded_jwt = encode({
                    "user_id": user.id,
                    'exp': datetime.utcnow() + timedelta(days=1)
                }, "secret", algorithm="HS256")

                refresh_token = encode({
                    'user_id': user.id,
                    'exp': datetime.utcnow() + timedelta(days=30)
                }, "secret", algorithm="HS256")

                if is_new:
                    bank = Bank.objects.get(bank_code=bank_code)
                    accounts_data = {}
                    accounts = Account.objects.filter(user=user, bank=bank)

                    for account in accounts:
                        transactions_list = []

                        transactions = Transaction.objects.filter(
                            account_from_id=account
                        ) | Transaction.objects.filter(
                            account_to_id=account
                        )

                        for transaction in transactions:
                            if transaction.account_from_id == account:
                                amount = -transaction.quantity
                            else:
                                amount = transaction.quantity

                            transactions_list.append({
                                "amount": int(amount),
                                "date": transaction.date_time.isoformat(),
                                "category": transaction.category,
                            })
                        subscription = Subscriptions.objects.create(account_id=account, url='http://backend:8000/webhook/transaction/')
                        accounts_data[account.account_number] = transactions_list

                    return Response(
                        {
                            "jwt": encoded_jwt,
                            "refresh": refresh_token,
                            "accounts": accounts_data
                        },
                        status=status.HTTP_200_OK
                    )

                return Response(
                    {"jwt": encoded_jwt, "refresh": refresh_token},
                    status=status.HTTP_200_OK
                )

            except ObjectDoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"error": f"{phone_number}"}, status=status.HTTP_400_BAD_REQUEST)

class SubscribeView(APIView):

    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="",
        operation_summary="Обработчик для подписки на оповещения о транзакциях",

        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['url', 'account_number'],
            properties={
                'url': openapi.Schema(type=openapi.TYPE_STRING),
                'account_number': openapi.Schema(type=openapi.TYPE_INTEGER)
            },
        ),
        responses={
            "201": openapi.Response(
                description="Возвращается в случае создания "
                            "записи в таблице подписок",
            ),
            "401": openapi.Response(
                description="Возвращается при некорректном или "
                            "просроченном токене",
            ),
            "403": openapi.Response(
                description="Возвращается, если пользователь не "
                            "является владельцем счета",
            ),
            "404": openapi.Response(
                description="Возвращается при передаче неправильных параметров",
            ),
        },
        tags = ['handlerы for webhook']
    )
    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        try:
            user_id = decode(token, "secret", algorithms=["HS256"])["user_id"]
        except ExpiredSignatureError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        url = self.request.POST.get("url")
        account_number = self.request.POST.get("account_number")
        try:
            account = Account.objects.get(account_number=account_number)
            if user.id != account.user.id:
                return Response(status=status.HTTP_403_FORBIDDEN)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # TODO: Добавить проверку успешного добавления подписки в БД
        subscription = Subscriptions.objects.create(
            account_id=account, url=url)
        return Response(status=status.HTTP_201_CREATED)


class UnsubscribeView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="",
        operation_summary="Обработчик для отписки от оповещенияй о транзакциях",

        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['url'],
            properties={
                'account_number': openapi.Schema(type=openapi.TYPE_INTEGER)
            },
        ),
        responses={
            "201": openapi.Response(
                description="Возвращается в случае удаления "
                            "записи в таблице подписок",
            ),
            "401": openapi.Response(
                description="Возвращается при некорректном или "
                            "просроченном токене",
            ),
            "403": openapi.Response(
                description="Возвращается, если пользователь не "
                            "является владельцем счета",
            ),
            "404": openapi.Response(
                description="Возвращается при передаче неправильных параметров",
            ),
        },
        tags=['handlerы for webhook']
    )
    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        try:
            user_id = decode(token, "secret", algorithms=["HS256"])["user_id"]
        except ExpiredSignatureError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        account_number = self.request.POST.get("account_number")
        try:
            account = Account.objects.get(account_number=account_number)
            if user.id != account.user.id:
                return Response(status=status.HTTP_403_FORBIDDEN)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # TODO: Добавить проверку успешного удаления подписки из БД
        subscription = Subscriptions.objects.filter(
            account_id=account).delete()
        return Response(status=status.HTTP_200_OK)


class AccountInfoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        try:
            user_id = decode(token, "secret", algorithms=["HS256"])["user_id"]
        except ExpiredSignatureError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        account_number = request.GET.get('account_number', '')
        if account_number:
            try:
                account = Account.objects.get(account_number=account_number)
                if user.id != account.user.id:
                    return Response(status=status.HTTP_403_FORBIDDEN)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            return Response({"balance": account.balance},
                            status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetTransactions(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        try:
            user_id = decode(token, "secret", algorithms=["HS256"])["user_id"]
        except ExpiredSignatureError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        date_from = request.GET.get('from', '')
        date_to = request.GET.get('to', '')
        if date_from and date_to:
            date_from = datetime.strptime(date_from, '%d-%m-%Y')
            date_to = datetime.strptime(date_to, '%d-%m-%Y')
            transactions = Transaction.objects.filter(
                date__range=[date_from, date_to]
            )
            return Response({"transactions": list(transactions)},
                            status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class MakeTransaction(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        account_from = self.request.POST.get("from")
        account_to = self.request.POST.get("to")
        bank_from = self.request.POST.get("bank_from")
        bank_to = self.request.POST.get("bank_to")
        amount = self.request.POST.get("amount")
        category = self.request.POST.get("category")
        try:
            account_from_obj = Account.objects.get(account_number=account_from)
            account_to_obj = Account.objects.get(account_number=account_to)
            bank_from_obj = Bank.objects.get(name=bank_from)
            bank_to_obj = Bank.objects.get(name=bank_to)
        except ObjectDoesNotExist:
            return Response({"message": f"{[account_from, account_to]}]"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            with transaction.atomic():
                Transaction.objects.create(
                    account_from_id=account_from_obj,
                    account_to_id=account_to_obj,
                    bank_from_id=bank_from_obj,
                    bank_to_id=bank_to_obj,
                    category=category,
                    quantity=amount,
                )
                account_from_obj.balance -= int(amount)
                account_from_obj.save()
                account_to_obj.balance += int(amount)
                account_to_obj.save()
        except IntegrityError:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        date = datetime.now()
        try:
            url1 = Subscriptions.objects.get(account_id=account_from_obj)
            data = {
                "account_code": account_from_obj.account_number,
                "bank_code": bank_from_obj.bank_code,
                "amount": -int(amount),
                "category": category,
                "user_id": account_from_obj.user.id,
                "date": str(date),
                "balance": int(account_from_obj.balance)
            }
            request1 = post(url1.url, data=data)
            #request1 = post('http://backend:8000/webhook/transaction/', data=data)
        except ObjectDoesNotExist:
            pass
        try:
            url2 = Subscriptions.objects.get(account_id=account_to_obj)
            data = {
                "account_code": account_to_obj.account_number,
                "bank_code": bank_to_obj.bank_code,
                "amount": int(amount),
                "category": category,
                "user_id": account_to_obj.user.id,
                "date": str(date),
                "balance": int(account_to_obj.balance)
            }
            request2 = post(url2.url, data=data)
            #request2 = post('http://backend:8000/webhook/transaction/', data=data)
        except ObjectDoesNotExist:
            pass
        return Response(status=status.HTTP_201_CREATED)


class RefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh = self.request.POST.get("refresh")
        if refresh:
            try:
                user_id = decode(refresh, "secret", algorithms=["HS256"])["user_id"]
            except ExpiredSignatureError:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            try:
                user = User.objects.get(id=user_id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            encoded_jwt = encode({"user_id": user.id,
                                  'exp': datetime.utcnow() +
                                         timedelta(days=1)},
                                 "secret", algorithm="HS256")
            return Response(
                    {"jwt": encoded_jwt},
                    status=status.HTTP_200_OK
                )
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CreateAccount(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION']
        try:
            user_id = decode(token, "secret", algorithms=["HS256"])["user_id"]
        except ExpiredSignatureError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        account_code = int(self.request.POST.get("account_code"))
        bank_code = int(self.request.POST.get("bank_code"))
        balance = float(self.request.POST.get("balance"))
        try:
            bank = Bank.objects.get(bank_code=bank_code)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if Account.objects.exists(account_number=account_code):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            account = Account.create(account_number=account_code, bank=bank, user=user, balance=balance)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        data = {
                "account_code": account.account_number,
                "bank_code": bank.bank_code,
                "phone_number": user.phone_number
            }
        request = post('http://backend:8000/createaccount', data=data)
        return Response(status=status.HTTP_201_CREATED)
