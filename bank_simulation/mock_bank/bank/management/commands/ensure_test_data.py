import os
from django.core.management.base import BaseCommand, CommandError
from bank.models import Bank, Account, Transaction, User as CustomUser
from django.contrib.auth import get_user_model

AuthUser = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        username = os.getenv("DJANGO_SUPERUSER_NAME", "admin")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "1234")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@admin.com")

        try:
            AuthUser.objects.create_superuser(username, email, password)
            self.stdout.write(f"Superuser successfully get_or_created.")
        except:
            self.stdout.write("Superuser already exists.")
            return

        bank1, _ = Bank.objects.get_or_create(name="KG Bank", bank_code=100000000)
        bank2, _ = Bank.objects.get_or_create(name="VEDB", bank_code=100000001)
        bank3, _ = Bank.objects.get_or_create(name="GO-Bank", bank_code=100000002)

        user1, _ = CustomUser.objects.get_or_create(
            name="user1", phone_number="+71234567890"
        )
        user2, _ = CustomUser.objects.get_or_create(
            name="user2", phone_number="+71234567891"
        )
        user3, _ = CustomUser.objects.get_or_create(
            name="user3", phone_number="+71234567892"
        )

        account1, _ = Account.objects.get_or_create(
            user=user1, account_number=100000, bank=bank1
        )
        account2, _ = Account.objects.get_or_create(
            user=user1, account_number=100001, bank=bank2
        )
        account3, _ = Account.objects.get_or_create(
            user=user1, account_number=100002, bank=bank3
        )
        account4, _ = Account.objects.get_or_create(
            user=user2, account_number=100003, bank=bank1
        )
        account5, _ = Account.objects.get_or_create(
            user=user2, account_number=100004, bank=bank3
        )
        account6, _ = Account.objects.get_or_create(
            user=user3, account_number=100005, bank=bank2
        )

        Transaction.objects.get_or_create(
            account_from_id=account1,
            account_to_id=account6,
            bank_from_id=bank1,
            bank_to_id=bank2,
            category="salary",
            quantity=5000,
            date_time="2024-11-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account5,
            account_to_id=account2,
            bank_from_id=bank3,
            bank_to_id=bank2,
            category="entertainment",
            quantity=100,
            date_time="2024-11-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account4,
            account_to_id=account3,
            bank_from_id=bank1,
            bank_to_id=bank3,
            category="food",
            quantity=1000,
            date_time="2024-11-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account3,
            account_to_id=account1,
            bank_from_id=bank3,
            bank_to_id=bank1,
            category="transfer",
            quantity=500,
            date_time="2024-11-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account2,
            account_to_id=account4,
            bank_from_id=bank2,
            bank_to_id=bank1,
            category="utilities",
            quantity=400,
            date_time="2024-11-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account6,
            account_to_id=account5,
            bank_from_id=bank2,
            bank_to_id=bank3,
            category="investment",
            quantity=1000,
            date_time="2024-11-01T12:34:56",
        )

        Transaction.objects.get_or_create(
            account_from_id=account1,
            account_to_id=account6,
            bank_from_id=bank1,
            bank_to_id=bank2,
            category="salary",
            quantity=15000,
            date_time="2024-10-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account5,
            account_to_id=account2,
            bank_from_id=bank3,
            bank_to_id=bank2,
            category="entertainment",
            quantity=1200,
            date_time="2024-10-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account4,
            account_to_id=account3,
            bank_from_id=bank1,
            bank_to_id=bank3,
            category="food",
            quantity=1030,
            date_time="2024-10-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account3,
            account_to_id=account1,
            bank_from_id=bank3,
            bank_to_id=bank1,
            category="transfer",
            quantity=6700,
            date_time="2024-10-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account2,
            account_to_id=account4,
            bank_from_id=bank2,
            bank_to_id=bank1,
            category="utilities",
            quantity=600,
            date_time="2024-10-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account6,
            account_to_id=account5,
            bank_from_id=bank2,
            bank_to_id=bank3,
            category="investment",
            quantity=3500,
            date_time="2024-10-01T12:34:56",
        )

        Transaction.objects.get_or_create(
            account_from_id=account1,
            account_to_id=account6,
            bank_from_id=bank1,
            bank_to_id=bank2,
            category="salary",
            quantity=25000,
            date_time="2024-10-20T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account5,
            account_to_id=account2,
            bank_from_id=bank3,
            bank_to_id=bank2,
            category="entertainment",
            quantity=800,
            date_time="2024-10-20T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account4,
            account_to_id=account3,
            bank_from_id=bank1,
            bank_to_id=bank3,
            category="food",
            quantity=550,
            date_time="2024-10-20T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account3,
            account_to_id=account1,
            bank_from_id=bank3,
            bank_to_id=bank1,
            category="transfer",
            quantity=489,
            date_time="2024-10-20T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account2,
            account_to_id=account4,
            bank_from_id=bank2,
            bank_to_id=bank1,
            category="utilities",
            quantity=1000,
            date_time="2024-10-20T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account6,
            account_to_id=account5,
            bank_from_id=bank2,
            bank_to_id=bank3,
            category="investment",
            quantity=1000,
            date_time="2024-10-20T12:34:56",
        )

        Transaction.objects.get_or_create(
            account_from_id=account1,
            account_to_id=account6,
            bank_from_id=bank1,
            bank_to_id=bank2,
            category="salary",
            quantity=3000,
            date_time="2024-10-30T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account5,
            account_to_id=account2,
            bank_from_id=bank3,
            bank_to_id=bank2,
            category="entertainment",
            quantity=890,
            date_time="2024-10-30T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account4,
            account_to_id=account3,
            bank_from_id=bank1,
            bank_to_id=bank3,
            category="food",
            quantity=250,
            date_time="2024-10-30T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account3,
            account_to_id=account1,
            bank_from_id=bank3,
            bank_to_id=bank1,
            category="transfer",
            quantity=500,
            date_time="2024-10-30T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account2,
            account_to_id=account4,
            bank_from_id=bank2,
            bank_to_id=bank1,
            category="utilities",
            quantity=400,
            date_time="2024-10-30T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account6,
            account_to_id=account5,
            bank_from_id=bank2,
            bank_to_id=bank3,
            category="investment",
            quantity=1000,
            date_time="2024-10-30T12:34:56",
        )

        Transaction.objects.get_or_create(
            account_from_id=account1,
            account_to_id=account6,
            bank_from_id=bank1,
            bank_to_id=bank2,
            category="salary",
            quantity=55000,
            date_time="2024-06-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account5,
            account_to_id=account2,
            bank_from_id=bank3,
            bank_to_id=bank2,
            category="entertainment",
            quantity=800,
            date_time="2024-06-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account4,
            account_to_id=account3,
            bank_from_id=bank1,
            bank_to_id=bank3,
            category="food",
            quantity=660,
            date_time="2024-06-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account3,
            account_to_id=account1,
            bank_from_id=bank3,
            bank_to_id=bank1,
            category="transfer",
            quantity=4000,
            date_time="2024-06-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account2,
            account_to_id=account4,
            bank_from_id=bank2,
            bank_to_id=bank1,
            category="utilities",
            quantity=400,
            date_time="2024-06-01T12:34:56",
        )
        Transaction.objects.get_or_create(
            account_from_id=account6,
            account_to_id=account5,
            bank_from_id=bank2,
            bank_to_id=bank3,
            category="investment",
            quantity=15000,
            date_time="2024-06-01T12:34:56",
        )
