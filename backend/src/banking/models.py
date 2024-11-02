from django.contrib.auth import get_user_model
from django.db import models
from users.models import CustomUser
from django.db.models import UniqueConstraint

User = get_user_model()

class Bank(models.Model):
    name = models.CharField(max_length=30)
    bank_code = models.IntegerField(unique=True)

class Account(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    bank_id = models.ForeignKey(Bank, on_delete=models.CASCADE)
    account_code = models.IntegerField()
    isHide = models.BooleanField(default=False)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['bank_id', 'account_code'], name='unique_bank_account_code')
        ]

class Transaction(models.Model):
    TYPE_CHOICES = [
        ('income', 'Доход'),
        ('expense', 'Расход'),
    ]

    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.IntegerField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)


class UserBank(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    bank_id = models.ForeignKey(Bank, on_delete=models.CASCADE)
    access = models.CharField(max_length=255)
    refresh = models.CharField(max_length=255)
    date = models.DateField()