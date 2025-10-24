from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_featured', 'is_active', 'created_at']
    list_filter = ['category', 'is_featured', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_featured', 'is_active']
    
    fieldsets = (
        ('Asosiy', {'fields': ('name', 'slug', 'category', 'description')}),
        ('Narx', {'fields': ('price', 'material', 'dimensions')}),
        ('Rasmlar', {'fields': ('image', 'image_2', 'image_3')}),
        ('Uzum', {'fields': ('uzum_link',)}),
        ('Status', {'fields': ('is_featured', 'is_active')}),
    )
