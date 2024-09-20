from django.shortcuts import render,redirect
from django.http import HttpResponse
from api import models, serializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login,logout,authenticate
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializer.MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = models.User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = serializer.RegisterSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def DashboardView(req):
    if req.method == "GET":
        response = f'Hey {req.user}'
        return Response({"response":response}, status=status.HTTP_200_OK)
    elif req.method == "POST":
        text = req.POST.get("text")
        response = f"Hey {req.user}, your text is {text}"
        return Response({"response":response}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

class UpdateSubscriptionView(generics.UpdateAPIView):
    serializer_class = serializer.ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class UserView(generics.ListAPIView):
    queryset = models.User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = serializer.UserSerializer

class ProfileView(generics.ListAPIView):
    queryset = models.Profile.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = serializer.ProfileSerializer
    
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = serializer.ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


# def register(req):
#     if req.method == 'POST':
#         form = UserCreationForm(req.POST)
#         if form.is_valid():
#             user = form.save()
#             login(req,user)
#             return 'success'
#     else:
#         form = UserCreationForm()
#     return 'login'

# def login(req):
#     pass

# def logout(req):
#     pass


# chat gpt code
class EditUserProfileView(generics.UpdateAPIView):
    serializer_class = serializer.ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def update(self, request, *args, **kwargs):
        # Handle partial updates by passing partial=True to the serializer
        partial = kwargs.pop('partial', True)  # Set to True for partial updates
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)