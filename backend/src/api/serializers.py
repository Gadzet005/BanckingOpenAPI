from rest_framework import serializers
from banking.models import Transaction, Account, UserAccount, Bank, PeriodicPayment
from rest_framework.exceptions import ValidationError
import requests

class TransactionSerializer(serializers.ModelSerializer):
    account_code = serializers.IntegerField(source='account_id.account_code', read_only=True)
    bank_name = serializers.CharField(source='account_id.bank_id.name', read_only=True)
    bank_code = serializers.IntegerField(source='account_id.bank_id.bank_code', read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'type', 'subtype', 'date', 'account_code', 'bank_name', 'bank_code']

class AccountSerializer(serializers.ModelSerializer):
    bank_name = serializers.CharField(source='bank_id.name', read_only=True)
    bank_code = serializers.IntegerField(source='bank_id.bank_code', read_only=True)
    balance = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ['id', 'account_code', 'bank_name', 'bank_code', 'isHide', 'balance']

    def get_balance(self, obj):
        user = self.context['request'].user
        try:
            useraccount = UserAccount.objects.filter(user_id = user)[0]
        except UserAccount.DoesNotExist:
            raise ValidationError("Профиль пользователя не найден")
        url = "http://bank:5000/getinfo/"
        headers = {
            "Authorization": f"Bearer {useraccount.access_token}"
        }
        params = {
            "account_number": obj.account_code
        }
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 401:
            response_token = requests.post(
                            "http://bank:5000/get_token/",
                            json={"phone_number": user.phone_number,
                                "bank_code": self.bank_code},
                            timeout=100
                        )
            response_data = response_token.json()
            encoded_jwt = response_data.get("jwt")
            refresh_token = response_data.get("refresh")
            useraccount.access_token = encoded_jwt
            useraccount.save()
            url = "http://bank:5000/getinfo/"
            headers = {
                "Authorization": f"Bearer {useraccount.access_token}"
            }
            params = {
                "account_number": obj.id
            }
            response = requests.get(url, headers=headers, params=params)
            if response.status_code == 200:
                data = response.json()
                balance = data.get("balance")
                return balance
        elif response.status_code == 200:
            data = response.json()
            balance = data.get("balance")
            return int(balance)
        return None

class PeriodicPaymentSerializer(serializers.ModelSerializer):
    account_code = serializers.IntegerField(source='account_id.account_code', read_only=True)
    bank_name = serializers.CharField(source='account_id.bank_id.name', read_only=True)
    bank_code = serializers.IntegerField(source='account_id.bank_id.bank_code', read_only=True)

    class Meta:
        model = PeriodicPayment
        fields = ['id', 'amount', 'period', 'period_type', 'creator', 'date', 'account_code', 'bank_name', 'bank_code']