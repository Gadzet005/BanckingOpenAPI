from django.core.management.base import BaseCommand, CommandError
from banking.models import Bank, Account
from users.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        user = None
        try:
            user = CustomUser.objects.create_user(
                email="test@example.com", password="test1234", phone_number="1234567890"
            )
        except:
            user = CustomUser.objects.get(email="test@example.com")

        bank, _ = Bank.objects.get_or_create(
            name="Test bank", bank_code=1234, api_url="http://localhost:8080"
        )
        self.stdout.write(f"Bank created: bankCode={bank.bank_code}.")

        account, _ = Account.objects.get_or_create(
            user_id=user, bank_id=bank, account_code=12345678, isHide=False
        )

        self.stdout.write(f"Account created: accountCode={account.account_code}.")
