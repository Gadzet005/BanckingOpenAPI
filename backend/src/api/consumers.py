import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken

class TransactionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        
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
        await self.send(text_data=json.dumps({
            'bank_name': event['bank_name'],
            'account_code': event['account_code'],
            'amount': event['amount'],
            'type': event['transaction_type'],
            'description': event['description'],
            'date': event['date']
        }))


