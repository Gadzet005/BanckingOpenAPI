from django.db import models
from datetime import datetime


TYPES_OF_TRANSACTION = [
    ("entertainment", "Развлечения"),
    ("food", "Еда"),
    ("transport", "Транспорт"),
    ("utilities", "Коммунальные услуги"),
    ("transfer", "Перевод"),
    ("salary", "Зарплата"),
    ("investment", "Инвестиции"),
    ("gift", "Подарок"),
]

PERIOD_CHOICE = [("days", "Дни"), ("months", "Месяцы"), ("years", "Годы")]


class Bank(models.Model):
    name = models.CharField(max_length=50, unique=True)
    bank_code = models.IntegerField(null=True, unique=True)

    def __str__(self):
        return f"{self.name}: {self.bank_code}"


class User(models.Model):
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=12, unique=True)


class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_number = models.IntegerField(unique=True)
    bank = models.ForeignKey(Bank, on_delete=models.PROTECT)
    balance = models.FloatField(default=0)

    def __str__(self):
        return str(self.account_number)


class Transaction(models.Model):
    account_from_id = models.ForeignKey(
        Account, on_delete=models.PROTECT, related_name="account_from"
    )
    account_to_id = models.ForeignKey(
        Account, on_delete=models.PROTECT, related_name="account_to"
    )
    bank_from_id = models.ForeignKey(
        Bank, on_delete=models.PROTECT, related_name="bank_from"
    )
    bank_to_id = models.ForeignKey(
        Bank, on_delete=models.PROTECT, related_name="bank_to"
    )
    category = models.CharField(max_length=30, choices=TYPES_OF_TRANSACTION)
    quantity = models.FloatField()
    date_time = models.DateTimeField(default=datetime.now)


class PeriodicPayment(models.Model):
    account_from_id = models.ForeignKey(
        Account, on_delete=models.PROTECT, related_name="periodic_account_from"
    )
    account_to_id = models.ForeignKey(
        Account, on_delete=models.PROTECT, related_name="periodic_account_to"
    )
    amount = models.IntegerField()
    creator = models.CharField()
    period_type = models.CharField(choices=PERIOD_CHOICE)
    period = models.IntegerField()
    creation_tyme = models.DateTimeField(default=datetime.now)


class Subscriptions(models.Model):
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    url = models.URLField()
