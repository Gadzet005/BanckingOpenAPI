import os
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        username = os.getenv("DJANGO_SUPERUSER_NAME")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL")

        if not username or not password or not email:
            raise CommandError(
                "DJANGO_SUPERUSER_NAME, DJANGO_SUPERUSER_PASSWORD, and DJANGO_SUPERUSER_EMAIL"
                "environment variables must be set."
            )

        try:
            User.objects.create_superuser(username, email, password)
            self.stdout.write(f"Superuser successfully created.")
        except:
            self.stdout.write("Superuser already exists.")
