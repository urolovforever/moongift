#!/bin/bash

cd ~/PycharmProjects/moon/backend

echo "🎨 Django Admin Panel'ni zamonавiylashtirish..."

# ==========================================
# 1. Django Jazzmin o'rnatish
# ==========================================
echo "📦 Django Jazzmin o'rnatilmoqda..."
source venv/bin/activate
pip install django-jazzmin

# requirements.txt ga qo'shish
echo "django-jazzmin==2.6.0" >> requirements.txt

# ==========================================
# 2. settings.py ni yangilash
# ==========================================
echo "⚙️  settings.py ni yangilash..."

cat > core/settings.py << 'EOF'
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='django-insecure-dev-key')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=lambda v: [s.strip() for s in v.split(',')])

INSTALLED_APPS = [
    'jazzmin',  # Admin panel dizayni (django.contrib.admin dan oldin!)
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'rest_framework',
    'corsheaders',
    
    'products',
    'contact',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'uz'
TIME_ZONE = 'Asia/Tashkent'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 12,
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer'],
}

# ==========================================
# JAZZMIN SOZLAMALARI
# ==========================================
JAZZMIN_SETTINGS = {
    # Title
    "site_title": "MoonGift Admin",
    "site_header": "MoonGift Boshqaruv Paneli",
    "site_brand": "🌙 MoonGift",
    "welcome_sign": "MoonGift Admin Paneliga Xush Kelibsiz",
    "copyright": "MoonGift 2025",
    
    # Logo
    "site_logo": None,  # Yoki "/static/logo.png"
    "login_logo": None,
    "site_logo_classes": "img-circle",
    
    # Icons (Font Awesome 5)
    "site_icon": None,
    
    # Top Menu
    "topmenu_links": [
        {"name": "Bosh Sahifa", "url": "admin:index", "permissions": ["auth.view_user"]},
        {"name": "Saytni Ko'rish", "url": "http://localhost:5173", "new_window": True},
        {"model": "products.Product"},
        {"model": "products.Category"},
    ],
    
    # User Menu
    "usermenu_links": [
        {"model": "auth.user"}
    ],
    
    # Side Menu
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    
    # Order
    "order_with_respect_to": ["products", "contact", "auth"],
    
    # Icons (Font Awesome 5)
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "products.Category": "fas fa-th-large",
        "products.Product": "fas fa-box",
        "contact.ContactMessage": "fas fa-envelope",
    },
    
    # Default Icons
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
    
    # UI Tweaks
    "show_ui_builder": False,
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {
        "auth.user": "collapsible",
        "auth.group": "vertical_tabs"
    },
    
    # Theme
    "theme": "flatly",  # bootstrap themes: cerulean, cosmo, flatly, journal, litera, lumen, lux, materia, minty, pulse, sandstone, simplex, slate, solar, spacelab, superhero, united, yeti
}

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-success",
    "accent": "accent-teal",
    "navbar": "navbar-dark",
    "no_navbar_border": False,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-dark-warning",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": False,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "flatly",
    "dark_mode_theme": "darkly",
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success"
    }
}
EOF

echo "✅ settings.py yangilandi!"

# ==========================================
# 3. Admin.py fayllarini yaxshilash
# ==========================================
echo "📝 Admin fayllarni yangilash..."

# products/admin.py
cat > products/admin.py << 'EOF'
from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'product_count', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']
    list_per_page = 20
    
    def product_count(self, obj):
        count = obj.products.count()
        return format_html('<b style="color: green;">{}</b>', count)
    product_count.short_description = 'Mahsulotlar Soni'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'name', 'category', 'formatted_price', 'is_featured', 'is_active', 'created_at']
    list_filter = ['category', 'is_featured', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'material']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_featured', 'is_active']
    list_per_page = 20
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('📦 Asosiy Ma\'lumotlar', {
            'fields': ('name', 'slug', 'category', 'description'),
            'classes': ('wide',)
        }),
        ('💰 Narx va O\'lchamlar', {
            'fields': ('price', 'material', 'dimensions'),
            'classes': ('wide',)
        }),
        ('🖼️ Rasmlar', {
            'fields': ('image', 'image_2', 'image_3'),
            'classes': ('wide',)
        }),
        ('🛒 Uzum Market', {
            'fields': ('uzum_link',),
            'classes': ('wide',)
        }),
        ('⚙️ Status', {
            'fields': ('is_featured', 'is_active'),
            'classes': ('wide',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 5px; object-fit: cover;" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Rasm'
    
    def formatted_price(self, obj):
        return format_html('<b style="color: #2e7d32;">{:,.0f} so\'m</b>', obj.price)
    formatted_price.short_description = 'Narx'
    formatted_price.admin_order_field = 'price'
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
EOF

# contact/admin.py
cat > contact/admin.py << 'EOF'
from django.contrib import admin
from django.utils.html import format_html
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['status_icon', 'name', 'email', 'phone', 'short_message', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'phone', 'message']
    list_editable = ['is_read']
    readonly_fields = ['created_at', 'full_message']
    list_per_page = 30
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('👤 Murojat Ma\'lumotlari', {
            'fields': ('name', 'email', 'phone'),
            'classes': ('wide',)
        }),
        ('💬 Xabar', {
            'fields': ('full_message',),
            'classes': ('wide',)
        }),
        ('📊 Status', {
            'fields': ('is_read', 'created_at'),
            'classes': ('wide',)
        }),
    )
    
    def status_icon(self, obj):
        if obj.is_read:
            return format_html('<span style="color: green; font-size: 20px;">✓</span>')
        return format_html('<span style="color: orange; font-size: 20px;">●</span>')
    status_icon.short_description = ''
    
    def short_message(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    short_message.short_description = 'Xabar'
    
    def full_message(self, obj):
        return format_html('<div style="padding: 15px; background: #f5f5f5; border-radius: 5px; white-space: pre-wrap;">{}</div>', obj.message)
    full_message.short_description = 'To\'liq Xabar'
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        updated = queryset.update(is_read=True)
        self.message_user(request, f'{updated} ta xabar o\'qilgan deb belgilandi.')
    mark_as_read.short_description = "Tanlangan xabarlarni o'qilgan deb belgilash"
    
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(is_read=False)
        self.message_user(request, f'{updated} ta xabar o\'qilmagan deb belgilandi.')
    mark_as_unread.short_description = "Tanlangan xabarlarni o'qilmagan deb belgilash"
EOF

echo "✅ Admin fayllar yangilandi!"

# ==========================================
# 4. Custom CSS yaratish (optional)
# ==========================================
echo "🎨 Custom CSS yaratish..."
mkdir -p static/admin/css

cat > static/admin/css/custom_admin.css << 'EOF'
/* Custom Admin Styles */
.field-image_preview img {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.field-image_preview img:hover {
    transform: scale(1.5);
}

/* Better table spacing */
#result_list td {
    padding: 12px 8px !important;
}

/* Highlighted rows */
#result_list tr:hover {
    background-color: #f5f5f5;
}
EOF

echo "✅ Custom CSS yaratildi!"

# ==========================================
# 5. Static fayllarni to'plash
# ==========================================
echo "📦 Static fayllarni to'plash..."
python manage.py collectstatic --noinput

echo ""
echo "✅ Django Admin Panel muvaffaqiyatli yangilandi!"
echo ""
echo "📋 Qanday o'zgarishlar bo'ldi:"
echo ""
echo "✨ Zamonaviy dizayn (Jazzmin theme)"
echo "🎨 Font Awesome iconlar"
echo "📊 Yaxshi ko'rinish va navigatsiya"
echo "🖼️ Rasm preview mahsulotlar ro'yxatida"
echo "💰 Formatted narxlar"
echo "📈 Filter va qidiruv yaxshilandi"
echo "⚡ Tez havolalar (Top Menu)"
echo "📧 Murojatlar uchun actions (mark as read/unread)"
echo ""
echo "🌐 Admin Panel: http://127.0.0.1:8000/admin"
echo ""
echo "🎨 Mavjud Themalar:"
echo "   - flatly (default)"
echo "   - darkly (dark mode)"
echo "   - superhero"
echo "   - cosmo"
echo "   - litera"
echo ""
echo "Theme o'zgartirish uchun settings.py da 'theme' ni o'zgartiring."
