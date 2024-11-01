from django.contrib.auth import get_user_model
from django.db import models
from users.models import CustomUser

User = get_user_model()

class Bank(models.Model):
    name = models.CharField(max_length=30)
    api_url = models.URLField()
    api_key = models.CharField(max_length=255, blank=True, null=True)

class Account(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    bank_id = models.ForeignKey(Bank, on_delete=models.CASCADE)
    isHide = models.BooleanField(default=False)

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