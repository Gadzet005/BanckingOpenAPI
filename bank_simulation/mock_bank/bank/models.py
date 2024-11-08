from django.db import models
from datetime import datetime


TYPES_OF_TRANSACTION = [
    ('entertainment', 'Развлечения'),
    ('food', 'Еда'),
    ('transport', 'Транспорт'),
    ('utilities', 'Коммунальные услуги'),
    ('transfer', 'Перевод'),
]


class Bank(models.Model):
    name = models.CharField(max_length=50, unique=True)


class User(models.Model):
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=12, unique=True)


class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_number = models.IntegerField(unique=True)
    bank = models.ForeignKey(Bank, on_delete=models.PROTECT)
    balance = models.FloatField()


class Transaction(models.Model):
    account_from_id = models.ForeignKey(
        Account, on_delete=models.PROTECT, related_name="account_from")
    account_to_id = models.ForeignKey(
        Account, on_delete=models.PROTECT, related_name="account_to")
    bank_from_id = models.ForeignKey(
        Bank, on_delete=models.PROTECT, related_name="bank_from")
    bank_to_id = models.ForeignKey(
        Bank, on_delete=models.PROTECT, related_name="bank_to")
    category = models.CharField(max_length=30, choices=TYPES_OF_TRANSACTION)
    quantity = models.FloatField()
    date_time = models.DateTimeField(default=datetime.now)


class Subscriptions(models.Model):
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    url = models.URLField()
