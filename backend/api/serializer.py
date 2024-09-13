from rest_framework_simplejwt.tokens import Token
from api import models
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields= ['id','username','email']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = models.Profile
        fields=['user','username','full_name','bio','image','subscribed']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Only basic details in token
        token['username'] = user.username
        token['email'] = user.email

        return token

class RegisterSerializer(serializers.ModelSerializer):
        password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
        password2 = serializers.CharField(write_only=True, required=True)

        class Meta:
            model= models.User
            fields=['email', 'username', 'password', 'password2']

        def validate(self, attrs):
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({'password':"Password fields doesn't match"})
            return attrs
        
        def create(self, validated_data):
            user = models.User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
            )
            user.set_password(validated_data['password'])
            user.save()

            return user

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['subscribed']

    def update(self, instance, validated_data):
        instance.subscribed = validated_data.get('subscribed', instance.subscribed)
        instance.save()
        return instance
