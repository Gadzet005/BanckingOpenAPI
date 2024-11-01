from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _


User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'password')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Пользователь с таким адресом электронной почты уже существует.")
        return value

    def validate_phone_number(self, value):
        if not value.startswith('+7'):
            raise serializers.ValidationError("Номер телефона должен начинаться с +7.")
        
        if not value[2:].isdigit() or len(value) != 12:
            raise serializers.ValidationError("Номер телефона должен быть в формате +7XXXXXXXXXX.")

        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Пользователь с таким номером телефона уже существует.")
        
        return value

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError(_("Не удалось войти с предоставленными данными."))

        if not user.is_active:
            raise serializers.ValidationError(_("Пользователь неактивен."))

        data = super().validate({'email': user.email, 'password': password})
        return data