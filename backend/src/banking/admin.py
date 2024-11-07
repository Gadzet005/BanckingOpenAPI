from django.contrib import admin
from .models import Bank, Account, Transaction, UserBank

class BankAdmin(admin.ModelAdmin):
    list_display = ('name', 'bank_code', 'api_url')
    search_fields = ('name', 'bank_code')
    ordering = ('name',)

admin.site.register(Bank, BankAdmin)


class AccountAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'bank_id', 'account_code', 'isHide')
    list_filter = ('isHide', 'bank_id')
    search_fields = ('user_id__email', 'bank_id__name', 'account_code')
    ordering = ('user_id', 'bank_id')

admin.site.register(Account, AccountAdmin)


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account_id', 'amount', 'type', 'subtype', 'date')
    list_filter = ('type', 'subtype', 'date')
    search_fields = ('account_id__user_id__email', 'subtype', 'type')
    ordering = ('-date',)

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['subtype'].choices = obj.get_subtype_choices() if obj else []
        return form

admin.site.register(Transaction, TransactionAdmin)

admin.site.register(UserBank)