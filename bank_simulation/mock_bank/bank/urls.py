from django.urls import path
from .views import (
    MakeTransaction,
    AuthView,
    SubscribeView,
    UnsubscribeView,
    AccountInfoView,
    RefreshView,
    GetTransactions,
    CreatePeriodicPaymentView,
)

urlpatterns = [
    path("make_transaction/", MakeTransaction.as_view(), name="make_transaction"),
    path("get_token/", AuthView.as_view(), name="get_token"),
    path("get_transactions/", GetTransactions.as_view(), name="get_transactions"),
    path("subscribe/", SubscribeView.as_view(), name="subscribe"),
    path("unsubscribe/", UnsubscribeView.as_view(), name="unsubscribe"),
    path("getinfo/", AccountInfoView.as_view(), name="getinfo"),
    path("refresh/", RefreshView.as_view(), name="refresh"),
    path(
        "make_periodic_payment/",
        CreatePeriodicPaymentView.as_view(),
        name="make_periodic_payment",
    ),
    path("get_token/", AuthView.as_view(), name="get_token"),
    path("get_transactions/", GetTransactions.as_view(), name="get_transactions"),
    path("subscribe/", SubscribeView.as_view(), name="subscribe"),
    path("unsubscribe/", UnsubscribeView.as_view(), name="unsubscribe"),
    path("getinfo/", AccountInfoView.as_view(), name="getinfo"),
    path("refresh/", RefreshView.as_view(), name="refresh"),
    path(
        "make_periodic_payment/",
        CreatePeriodicPaymentView.as_view(),
        name="make_periodic_payment",
    ),
]
