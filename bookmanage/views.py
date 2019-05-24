from django.shortcuts import render, redirect
from bookmanage.models import Books, User, Publisher, Author, Borrow, Faculty
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.db.models import Count
import json
from django.views.decorators.csrf import csrf_exempt
import requests

APPID = "wxd8c3d7d44c532aba"
SECRET = "4ae86f7faf0e8eebb5bc9ea52ed2eef9"


@csrf_exempt
def login(request):
    if request.method == "GET":
       return HttpResponseForbidden()
    data = json.loads(request.body.decode('utf-8'))
    code = data.get("code")
    r = requests.get("https://api.weixin.qq.com/sns/jscode2session?",
                     params={"appid": APPID, "secret": SECRET, "js_code": code, "grant_type": "authorization_code"})
    openid = r.json().get("openid", None)
    if openid is None:
        return JsonResponse({"status": "Error", "Error": "UnableGetOpenID"})
    return JsonResponse({"openid": openid})

def createuser(request):
    if request.method == "GET":
       return HttpResponseForbidden()
    data = json.loads(request.body.decode('utf-8'))
    openid = data.get("openid")
    name = data.get("name")
    stu_num = data.get("stu_num")
    avatar = data.get("avatar"),
    grade = data.get("grade"),
    faculty = data.get("faculty")
    
    if Faculty.objects.filter(name = faculty).count() == 0:
        Faculty.objects.create(name = faculty)
    f = Faculty.objects.get(name=faculty)

    User.objects.create(openid = openid, name = name, stu_num = stu_num, avatar=avatar, grade = grade, faculty = f)

    return JsonResponse({"status": 0})


def ShowUserInfo(request, user_id):
    try: 
        user = User.objects.get(openid=user_id)
    except User.DoesNotExist:
        return JsonResponse({
            "status": -1,
            "message": "user do not exist"
        })

    return JsonResponse({
        "status": 0, "name": user.name, "stu_num": user.stu_num, "avatar": user.avatar, "grade": user.grade, "faculty": user.faculty.name
        })



def index(request):
    books = Books.objects.all()
    def count(name):
        return Books.objects.all().filter(name = name).count()

    return JsonResponse({
        "status": 0, "books":[
            {"id": book.id, "name": book.name, "isbn": book.isbn,"publisher":book.publisher.name, "num":count(book.name)} 
            for book in books]})

def borrow(request):
    if request.method == "GET":
       return HttpResponseForbidden()

    data = json.loads(request.body.decode('utf-8'))
    openid = data.get("openid")
    book_id = data.get("book_id")

    try:
        user = User.objects.get(openid = openid)
    except User.DoesNotExist:
        return JsonResponse({
            "status": -1, "mes": "user does not exist"
        })
    
    try:
        book = Books.objects.get(id = book_id)
    except Books.DoesNotExist:
        return JsonResponse({
            "status": -2, "mes": "book does not exist"
        })



    num = Borrow.objects.filter(user__openid = openid, books__id=book_id, ifreturn = False).count()

    if num >= 1:
        return JsonResponse({
            "status": -3, "mes": "already borrowed it!"
        })
    else:
        Borrow.objects.create(user=user, books=book, ifreturn=False)
        return JsonResponse({
            "status": 0
        })

def borrowinfo(request):
    if request.method == "GET":
       return HttpResponseForbidden()

    data = json.loads(request.body.decode('utf-8'))
    openid = data.get("openid")

    borrowed_books = Borrow.objects.filter(user__openid = openid, ifreturn= False)

    return JsonResponse({
        "status": 0, "books":[
            {"id": b.books.id, "name": b.books.name, "isbn": b.books.isbn, "publisher":b.books.publisher.name, "date": b.time}
            for b in borrowed_books]})

def showFaculties(request):
    faculties = Faculty.objects.all()
    return JsonResponse({"faculties": [faculty.name
        for faculty in faculties]})

def ShowBookDetail(request, book_id):
    try:
        book = Books.objects.get(id=book_id)
    except Books.DoesNotExist:
        return JsonResponse({
            "status": "-1",
            "message": "book do not exist"
        })

    num = Books.objects.all().filter(name = book.name).count()

    return JsonResponse({"status": 0, "id": book.id, "name": book.name, "isbn": book.isbn,"publisher":book.publisher.name, "num":num})
