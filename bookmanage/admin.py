from django.contrib import admin
from .models import Publisher, Books, Author, Faculty

class PublisherAdmin(admin.ModelAdmin):
    fields = [ 'name']

admin.site.register(Publisher, PublisherAdmin)

class BooksAdmin(admin.ModelAdmin):
    fields = [ 'name','isbn','publisher']

admin.site.register(Books, BooksAdmin)


class AuthorAdmin(admin.ModelAdmin):
    fields = [ 'name','book']

admin.site.register(Author, AuthorAdmin)

class FacultyAdmin(admin.ModelAdmin):
    fields = [ 'name']

admin.site.register(Faculty, FacultyAdmin)


