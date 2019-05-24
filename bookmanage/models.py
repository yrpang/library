from django.db import models
import django.utils.timezone as timezone

class Publisher(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64)

class Books(models.Model):
    id = models.AutoField(primary_key=True)
    isbn = models.BigIntegerField(blank=True,null=True)
    name = models.CharField(max_length=200)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Author(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64)
    book = models.ManyToManyField(Books)

class Faculty(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64)

class User(models.Model):
    id = models.AutoField(primary_key=True)
    openid = models.CharField(max_length=64,default="null")
    name = models.CharField(max_length=64)
    stu_num = models.BigIntegerField()
    members = models.ManyToManyField(Books, through='Borrow')
    avatar = models.CharField(max_length=200, default="null")
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    grade = models.IntegerField(null=True)

class Borrow(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    books = models.ForeignKey(Books, on_delete=models.CASCADE)

    time = models.DateField(default=timezone.now)
    ifreturn = models.BooleanField(null=False, default=False)
