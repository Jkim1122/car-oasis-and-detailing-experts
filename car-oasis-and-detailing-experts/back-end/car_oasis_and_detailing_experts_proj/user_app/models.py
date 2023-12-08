from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Client(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(unique=True, blank=False, null=False, default=email)
    number = models.IntegerField(unique=True, null=True)
    #password
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS =[]
