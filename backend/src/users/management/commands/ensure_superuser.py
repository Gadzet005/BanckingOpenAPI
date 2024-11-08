import os
from django.core.management.base import BaseCommand, CommandError
from users.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        email = os.getenv("DJANGO_SUPERUSER_EMAIL")
        phone_number = os.getenv("DJANGO_SUPERUSER_PHONE_NUMBER")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")

        if not phone_number or not password or not email:
            raise CommandError(
                "DJANGO_SUPERUSER_PHONE_NUMBER, DJANGO_SUPERUSER_PASSWORD, "
                "and DJANGO_SUPERUSER_EMAIL environment variables must be set."
            )

        try:
            CustomUser.objects.create_superuser(
                email=email, password=password, phone_number=phone_number
            )
            self.stdout.write(f"Superuser successfully created.")
        except:
            self.stdout.write("Superuser already exists.")
