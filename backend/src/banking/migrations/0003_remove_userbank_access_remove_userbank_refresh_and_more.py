# Generated by Django 5.1.2 on 2024-11-02 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banking', '0002_bank_api_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userbank',
            name='access',
        ),
        migrations.RemoveField(
            model_name='userbank',
            name='refresh',
        ),
        migrations.AddField(
            model_name='userbank',
            name='bank_user_id',
            field=models.IntegerField(null=True),
        ),
    ]
