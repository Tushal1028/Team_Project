# Generated by Django 5.1.1 on 2024-09-13 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_profile_verified'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='profile_images/default.jpg', upload_to='profile_images/'),
        ),
    ]
