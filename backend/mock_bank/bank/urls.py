from django.urls import path
from .views import (MakeTransaction,
                    AuthView,
                    SubscribeView,
                    UnsubscribeView,
                    AccountInfoView)

urlpatterns = [
    path(
        'make_transaction/',
        MakeTransaction.as_view(),
        name='make_transaction'
    ),
    path(
        'get_token/',
        AuthView.as_view(),
        name='get_token'
    ),
    path(
        'subscribe/',
        SubscribeView.as_view(),
        name='subscribe'
    ),
    path(
        'unsubscribe/',
        UnsubscribeView.as_view(),
        name='unsubscribe'
    ),
    path(
        'getinfo/',
        AccountInfoView.as_view(),
        name='getinfo'
    )
]
