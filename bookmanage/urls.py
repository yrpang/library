from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/',views.login),
    path('user/create', views.createuser),
    path('user/<slug:user_id>/',views.ShowUserInfo, name='user_detail'),
    path('book/borrow',views.borrow),
    path('user/borrowed',views.borrowinfo),
    path('faculties/',views.showFaculties),
]
