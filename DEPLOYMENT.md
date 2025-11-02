# MoonGift - Render.com'ga Deploy Qilish

## SQLite3 bilan Render'ga joylash bo'yicha qo'llanma

### 1. Tayyorgarlik

Loyiha SQLite3 database bilan ishlashga tayyor. PostgreSQL kerak emas.

### 2. Render.com'da yangi Web Service yaratish

1. [Render.com](https://render.com) saytiga kiring
2. "New +" tugmasini bosing
3. "Web Service" tanlang
4. GitHub repositoryingizni ulang

### 3. Service sozlamalari

**Basic Settings:**
- **Name**: `moongift-backend`
- **Region**: Frankfurt yoki Oregon (yaqinroq tanlang)
- **Branch**: `main`
- **Runtime**: `Python 3`

**Build & Deploy:**
- **Build Command**: `./build.sh`
- **Start Command**: `cd backend && gunicorn core.wsgi:application`

### 4. Environment Variables

Render dashboard'da "Environment" bo'limida quyidagi o'zgaruvchilarni qo'shing:

```
SECRET_KEY = [Auto Generate qiling yoki o'zingizniki]
DEBUG = False
ALLOWED_HOSTS = your-app-name.onrender.com
CORS_ALLOWED_ORIGINS = https://your-frontend-domain.com
PYTHON_VERSION = 3.11.0
```

### 5. Deploy

- "Create Web Service" tugmasini bosing
- Render avtomatik ravishda loyihani build qiladi va deploy qiladi
- Build jarayoni:
  - Dependencies o'rnatiladi
  - Static fayllar to'planadi
  - Database migratsiyalari bajariladi

### 6. Admin Panel

Deploy tugagach, admin yaratish uchun:

1. Render dashboard'da "Shell" tab'ini oching
2. Quyidagi buyruqni bajaring:
```bash
cd backend
python manage.py createsuperuser
```

### 7. Frontend CORS sozlash

Frontend'ni deploy qilganingizdan keyin, Render'da `CORS_ALLOWED_ORIGINS` environment variable'ni yangilang:

```
CORS_ALLOWED_ORIGINS = https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### 8. Database haqida

- SQLite3 database Render'ning disk'ida saqlanadi
- **MUHIM**: Render free plan'da disk ephemeral (vaqtinchalik). Service qayta ishga tushsa, ma'lumotlar yo'qolishi mumkin.
- Production uchun Render Disk yoki boshqa database xizmatidan foydalaning.

### 9. Static Files

Static fayllar WhiteNoise orqali serve qilinadi. Qo'shimcha sozlash kerak emas.

### 10. Media Files

Agar foydalanuvchilar rasm yuklasalar, Render Disk yoki S3 kabi cloud storage kerak bo'ladi.

---

## Muammolarni hal qilish

### Build muvaffaqiyatsiz bo'lsa:
1. Build log'larni tekshiring
2. `build.sh` faylga execute huquqi bor-yo'qligini tekshiring
3. Python versiyasi to'g'riligini tasdiqlang

### Static fayllar yuklanmasa:
```bash
cd backend
python manage.py collectstatic --no-input
```

### Database migrationlari xatosi:
```bash
cd backend
python manage.py migrate --run-syncdb
```

---

**Yordam kerak bo'lsa:**
- Render Documentation: https://render.com/docs
- Django Deployment: https://docs.djangoproject.com/en/stable/howto/deployment/
