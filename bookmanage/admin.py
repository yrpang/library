from django.contrib import admin
from .models import Publisher, Books, Author, Faculty

class PublisherAdmin(admin.ModelAdmin):
    fields = [ 'id','name']

admin.site.register(Publisher, PublisherAdmin)

class BooksAdmin(admin.ModelAdmin):
    fields = [ 'id','name','isbn','publisher']

admin.site.register(Books, BooksAdmin)


class AuthorAdmin(admin.ModelAdmin):
    fields = [ 'id','name','book']

admin.site.register(Author, AuthorAdmin)

class FacultyAdmin(admin.ModelAdmin):
    fields = [ 'id','name']

admin.site.register(Faculty, FacultyAdmin)


