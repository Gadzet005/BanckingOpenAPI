from rest_framework import serializers
from banking.models import Transaction, Account

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

    class Meta:
        model = Account
        fields = ['id', 'account_code', 'bank_name', 'bank_code', 'isHide']