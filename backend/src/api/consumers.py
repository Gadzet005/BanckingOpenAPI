import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from jwt import decode as jwt_decode
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.conf import settings
from jwt import ExpiredSignatureError

from urllib.parse import parse_qs

class TransactionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'transactions'
        
        query_string = self.scope['query_string'].decode("utf-8")
        query_params = parse_qs(query_string)
        
        token_list = query_params.get("token")
        if not token_list:
            await self.close()
            return
        
        token = token_list[0]

        try:
            UntypedToken(token)
        except ExpiredSignatureError:
            await self.close(code=4401)
            return
        except (InvalidToken, TokenError):
            await self.close(code=4403)
            return

        user = await self.get_user_from_token(token)
        self.user_id = user.id

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
                'event_type': "transaction",
                'bank_code': event['bank_code'],
                'bank_name': event['bank_name'],
                'account_code': event['account_code'],
                'amount': event['amount'],
                'type': event['transaction_type'],
                'subtype': event['transaction_subtype'],
                'balance': event['balance'],
                'date': event['date']
            }))

    async def send_payment(self, event):
        if event['user_id'] == self.user_id:
            await self.send(text_data=json.dumps({
                'event_type': "periodic_payment",
                'bank_code': event['bank_code'],
                'bank_name': event['bank_name'],
                'account_code': event['account_code'],
                'amount': event['amount'],
                'period': event['period'],
                'period_type': event['period_type'],
                'date': event['date'],
                'creator': event['creator']
            }))

    @database_sync_to_async
    def get_user_from_token(self, token):
        decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_data.get("user_id")

        User = get_user_model()
        return User.objects.get(id=user_id)
