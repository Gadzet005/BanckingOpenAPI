import os
from django.core.management.base import BaseCommand, CommandError
from users.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@admin.com")
        phone_number = os.getenv("DJANGO_SUPERUSER_PHONE_NUMBER", "+78934562345")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "1234")

        try:
            CustomUser.objects.create_superuser(
                email=email, password=password, phone_number=phone_number
            )
            self.stdout.write(f"Superuser successfully created.")
        except:
            self.stdout.write("Superuser already exists.")
