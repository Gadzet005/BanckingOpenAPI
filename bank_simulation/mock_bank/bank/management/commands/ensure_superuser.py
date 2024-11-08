import os
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        username = os.getenv("DJANGO_SUPERUSER_NAME", "admin")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "1234")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@admin.com")

        try:
            User.objects.create_superuser(username, email, password)
            self.stdout.write(f"Superuser successfully created.")
        except:
            self.stdout.write("Superuser already exists.")
