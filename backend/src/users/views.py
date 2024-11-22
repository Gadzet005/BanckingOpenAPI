from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

import requests
from banking.models import Bank, Account, Transaction, UserAccount, PeriodicPayment


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            refresh["email"] = user.email
            refresh["phone_number"] = user.phone_number

            for bank in Bank.objects.all():
                if bank.api_url:
                    try:
                        response = requests.post(
                            bank.api_url + "/get_token/",
                            json={
                                "phone_number": user.phone_number,
                                "new": "True",
                                "bank_code": bank.bank_code,
                            },
                            timeout=100,
                        )
                        response_data = response.json()
                        encoded_jwt = response_data.get("jwt")
                        refresh_token = response_data.get("refresh")
                        accounts_data = response_data.get("accounts", {})
                        try:
                            useraccount = UserAccount.objects.get(user_id=user)
                            useraccount.access_token = encoded_jwt
                            useraccount.refresh_token = refresh_token
                        except:
                            useraccount = UserAccount.objects.create(
                                user_id=user,
                                access_token=encoded_jwt,
                                refresh_token=refresh_token,
                            )
                        for account_code, data in accounts_data.items():

                            account, created = Account.objects.get_or_create(
                                user_id=user,
                                access_token=encoded_jwt,
                                refresh_token=refresh_token,
                            )
                        for account_code, data in accounts_data.items():

                            account, created = Account.objects.get_or_create(
                                user_id=user, bank_id=bank, account_code=account_code
                            )

                            for item in data:
                                if item["data"] == "transaction":
                                    amount = item["amount"]
                                    if amount < 0:
                                        transaction_type = "expense"
                                    else:
                                        transaction_type = "income"
                                    try:
                                        Transaction.objects.create(
                                            account_id=account,
                                            amount=abs(item["amount"]),
                                            type=transaction_type,
                                            subtype=item["category"],
                                            date=item["date"],
                                        )
                                    except:
                                        Transaction.objects.create(
                                            account_id=account,
                                            amount=abs(item["amount"]),
                                            type=transaction_type,
                                            subtype="transfer",
                                            date=item["date"],
                                        )
                                elif item["data"] == "period_payment":
                                    try:
                                        PeriodicPayment.objects.create(
                                            account_id=account,
                                            amount=int(item["amount"]),
                                            date=item["date"],
                                            period=item["period"],
                                            period_type=item["period_type"],
                                        )
                                    except:
                                        pass

                        response.raise_for_status()
                    except requests.RequestException as e:
                        print(f"Error notifying bank {bank.name}: {e}")

            return Response(
                {
                    "message": "Пользователь успешно зарегистрирован.",
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
