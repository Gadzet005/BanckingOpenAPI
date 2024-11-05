from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction, IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from jwt import encode, decode
from requests import post

from .models import User, Subscriptions, Account, Bank, Transaction
from datetime import datetime


class AuthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # TODO: Устаревание jwt
        phone_number = request.GET.get('phone_number', '')
        if phone_number:
            try:
                user = User.objects.get(phone_number=phone_number)
                # TODO: Сделать нормальные ключи для шифрования
                encoded_jwt = encode({"user_id": user.id},
                                     "secret", algorithm="HS256")
                return Response(
                    {"jwt": encoded_jwt},
                    status=status.HTTP_200_OK
                )
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class SubscribeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION']
        user_id = decode(token, "secret", algorithm="HS256")["user_id"]
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

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION']
        user_id = decode(token, "secret", algorithm="HS256")["user_id"]
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
        token = request.META['HTTP_AUTHORIZATION']
        user_id = decode(token, "secret", algorithm="HS256")["user_id"]
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
        token = request.META['HTTP_AUTHORIZATION']
        user_id = decode(token, "secret", algorithm="HS256")["user_id"]
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
            return Response(status=status.HTTP_400_BAD_REQUEST)
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
                "account_code": account_from_obj.id,
                "bank_name": bank_from.id,
                "amount": -amount,
                "category": category,
                "user_id": account_from_obj.user.id,
                "date": date
            }
            request1 = post(url1.url, data)
        except ObjectDoesNotExist:
            pass
        try:
            url2 = Subscriptions.objects.get(account_id=account_to_obj)
            data = {
                "account_code": account_to_obj.id,
                "bank_name": bank_to.id,
                "amount": amount,
                "category": category,
                "user_id": account_to_obj.user.id,
                "date": date
            }
            request1 = post(url2.url, data)
        except ObjectDoesNotExist:
            pass
        return Response(status=status.HTTP_201_CREATED)
