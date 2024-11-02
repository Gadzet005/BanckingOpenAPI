import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken
from jwt import decode as jwt_decode
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.conf import settings

class TransactionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        
        headers = dict(
            (key.decode("utf-8"), value.decode("utf-8"))
            for key, value in self.scope["headers"]
        )
        token = headers.get("authorization")

        if token is None or not token.startswith("Bearer "):
            await self.close()
            return

        token = token.split()[1]

        try:
            UntypedToken(token)
        except InvalidToken:
            await self.close()
            return

        user = await self.get_user_from_token(token)
        self.user_id = user.id
        self.group_name = 'transactions'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def send_transaction(self, event):
        if event['user_id'] == self.user_id:
            await self.send(text_data=json.dumps({
                'bank_code': event['bank_code'],
                'bank_name': event['bank_name'],
                'account_code': event['account_code'],
                'amount': event['amount'],
                'type': event['transaction_type'],
                'description': event['description'],
                'balance': event['balance'],
                'date': event['date']
            }))

    @database_sync_to_async
    def get_user_from_token(self, token):
        # Метод для извлечения пользователя из JWT токена
        decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_data.get("user_id")

        User = get_user_model()
        return User.objects.get(id=user_id)

