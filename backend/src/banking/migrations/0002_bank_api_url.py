# Generated by Django 5.1.2 on 2024-11-02 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banking', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bank',
            name='api_url',
            field=models.URLField(null=True),
        ),
    ]
