from django.contrib import admin
from .models import Transaction, Subscriptions, Bank, Account, User, PeriodicPayment
from django.core.exceptions import ObjectDoesNotExist
from requests import post

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        'account_from_id',
        'account_to_id',
        'bank_from_id',
        'bank_to_id',
        'category',
        'quantity',
        'date_time'
    )

    def save_model(self, request, obj, form, change):
        try:
            url1 = Subscriptions.objects.filter(account_id=obj.account_from_id)
            data = {
                "account_code": obj.account_from_id.id,
                "bank_name": obj.bank_from_id.id,
                "amount": -obj.quantity,
                "category": obj.category,
                "user_id": obj.account_from_id.user.id,
                "date": str(obj.date_time)
            }
            for i in url1:
                request1 = post(i.url, data=data)
        except ObjectDoesNotExist:
            pass
        try:
            url2 = Subscriptions.objects.filter(account_id=obj.account_to_id)
            data = {
                "account_code": obj.account_to_id.id,
                "bank_name": obj.bank_to_id.id,
                "amount": obj.quantity,
                "category": obj.category,
                "user_id": obj.account_to_id.user.id,
                "date": str(obj.date_time)
            }
            for i in url2:
                request2 = post(i.url, data=data)
        except ObjectDoesNotExist:
            pass
        super().save_model(request, obj, form, change)


admin.site.register(Bank)
admin.site.register(Account)
admin.site.register(User)
admin.site.register(Subscriptions)
admin.site.register(PeriodicPayment)
