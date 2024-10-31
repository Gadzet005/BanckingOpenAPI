from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    phone_number = serializers.CharField(required=True, max_length=15)

    class Meta:
        model = User
        fields = ("phone_number", "password")

    def validate_phone_number(self, value):
        """Check if the phone number is already in use."""
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Пользователь с таким номером телефона уже существует.")
        return value

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["phone_number"],
            phone_number=validated_data["phone_number"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        password = attrs.get('password')

        user = authenticate(phone_number=phone_number, password=password)

        if user is None:
            raise serializers.ValidationError(
                _("Не удалось войти с предоставленными данными.")
            )

        if not user.is_active:
            raise serializers.ValidationError(_("Пользователь неактивен."))

        data = super().validate(attrs)
        return data