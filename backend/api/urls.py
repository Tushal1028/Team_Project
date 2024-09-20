from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('',getRoutes),
    path('user/',UserView.as_view()),
    path('profileView/',ProfileView.as_view()),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path("token/", MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/",RegisterView.as_view()),
    path("dashboard/",DashboardView),
    path('update-subscription/', UpdateSubscriptionView.as_view(), name='update_subscription'),
    path('update-User/', EditUserProfileView.as_view(), name='update_User'),
]
