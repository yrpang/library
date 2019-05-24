from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/',views.login),
    path('user/create/', views.createuser),
    path('user/borrowed/',views.borrowinfo),
    path('user/<slug:user_id>/',views.ShowUserInfo, name='user_detail'),
    path('book/borrow/',views.borrow),
    path('book/<int:book_id>/', views.ShowBookDetail, name='book_detail'),
    path('faculties/',views.showFaculties),
    path('search/',views.search)
]
