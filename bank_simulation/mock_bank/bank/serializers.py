from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    account_from_number = serializers.IntegerField(source='account_from_id.account_number', read_only=True)
    account_to_number = serializers.IntegerField(source='account_to_id.account_number', read_only=True)
    bank_from_code = serializers.IntegerField(source='bank_from_id.bank_code', read_only=True)
    bank_to_code = serializers.IntegerField(source='bank_to_id.bank_code', read_only=True)

    class Meta:
        model = Transaction
        fields = [
            'account_from_number',
            'account_to_number',
            'bank_from_code',
            'bank_to_code',
            'category',
            'quantity',
            'date_time'
        ]

