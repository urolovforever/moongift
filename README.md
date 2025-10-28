# 🌙 MoonGift - Lazer Yog'och Ishlov Berish Do'koni

Full-stack web application for a laser wood processing shop with Django REST Framework backend and React frontend.

---

## 📋 Talablar

### Backend
- Python 3.9+
- pip
- virtualenv

### Frontend
- Node.js 16+
- npm yoki yarn

---

## 🚀 Tezkor Ishga Tushirish

### 1️⃣ Loyihani Yuklab Olish

Birinchi qadam - barcha fayllarni yaratish uchun setup scriptni ishga tushiring:

```bash
# Setup scriptni yuklab oling va ishga tushiring
chmod +x full_setup_script.sh
./full_setup_script.sh
```

---

## 🔧 Backend Sozlash

### 1. Virtual Environmentni Yaratish

```bash
cd moongift/backend
python -m venv venv

# Linux/Mac
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 2. Kerakli Paketlarni O'rnatish

```bash
pip install -r requirements.txt
```

### 3. Ma'lumotlar Bazasini Sozlash

```bash
# Migrationlarni yaratish
python manage.py makemigrations
python manage.py migrate

# Superuser yaratish (admin panel uchun)
python manage.py createsuperuser
# Username: admin
# Email: admin@moongift.uz
# Password: (o'zingizni parolingizni kiriting)
```

### 4. Backend Serverini Ishga Tushirish

```bash
python manage.py runserver
```

✅ Backend endi **http://localhost:8000** da ishlaydi!

#### API Endpoints:
- `GET /api/products/` - Barcha mahsulotlar (filter, search, ordering)
- `GET /api/products/featured/` - Mashhur mahsulotlar
- `GET /api/products/{slug}/` - Bitta mahsulot
- `GET /api/categories/` - Kategoriyalar
- `POST /api/contact/` - Murojat yuborish

#### Admin Panel:
- URL: **http://localhost:8000/admin**
- Login: `admin` (yaratgan superuser)

---

## 🎨 Frontend Sozlash

**Yangi terminal oynasini oching** (backend ishlayotgan bo'lishi kerak!)

### 1. Frontend Papkasiga O'tish

```bash
cd moongift/frontend
```

### 2. Kerakli Paketlarni O'rnatish

```bash
npm install
```

### 3. Frontend Serverini Ishga Tushirish

```bash
npm run dev
```

✅ Frontend endi **http://localhost:5173** da ishlaydi!

---

## 📝 Loyihaning Tuzilishi

```
moongift/
├── backend/
│   ├── core/                    # Django asosiy sozlamalar
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── products/                # Mahsulotlar app
│   │   ├── models.py           # Category, Product modellari
│   │   ├── serializers.py      # API serializers
│   │   ├── views.py            # API views
│   │   ├── urls.py
│   │   └── admin.py
│   ├── contact/                 # Murojatlar app
│   │   ├── models.py           # ContactMessage modeli
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── admin.py
│   ├── media/                   # Rasm fayllari
│   ├── requirements.txt
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js          # Axios API konfiguratsiyasi
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── CategoryFilter.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   └── NotFound.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

---

## 👨‍💼 Admin Panel Ishlatish

### 1. Admin Panelga Kirish
- URL: http://localhost:8000/admin
- Login: yaratgan `superuser` ma'lumotlari

### 2. Kategoriya Qo'shish
1. Admin panelda **Kategoriyalar** bo'limini oching
2. "Add Category" tugmasini bosing
3. To'ldiring:
   - Nomi: "Stol bezaklari"
   - Tavsif: "Maxsus tayyorlangan stol bezaklari"
4. Save tugmasini bosing

### 3. Mahsulot Qo'shish
1. Admin panelda **Mahsulotlar** bo'limini oching
2. "Add Product" tugmasini bosing
3. To'ldiring:
   - Nomi: "Yog'ochdan tayyorlangan choy taxtasi"
   - Kategoriya: tanlang
   - Tavsif: batafsil tavsif yozing
   - Narx: 150000
   - Discount Percentage: 0-100 oralig'ida (chegirma foizi)
   - Rasm: yuklang (asosiy va 2 ta qo'shimcha)
   - Uzum Market Link: `https://uzum.uz/...`
   - Yandex Market Link: `https://market.yandex.uz/...` (ixtiyoriy)
   - Is Featured: ✅ (asosiy sahifada ko'rsatish uchun)
   - Is Active: ✅
4. Save tugmasini bosing

---

## 🎯 Frontend Sahifalar

| Sahifa | URL | Tavsif |
|--------|-----|--------|
| Bosh sahifa | `/` | Hero section, mashhur mahsulotlar |
| Mahsulotlar | `/products` | Barcha mahsulotlar, filter, qidiruv |
| Mahsulot tafsiloti | `/products/:slug` | To'liq ma'lumot, o'xshash mahsulotlar |
| Biz haqimizda | `/about` | Kompaniya haqida ma'lumot |
| Bog'lanish | `/contact` | Kontakt forma |

---

## 🔌 API Misollari

### Barcha mahsulotlarni olish
```bash
curl http://localhost:8000/api/products/
```

### Kategoriya bo'yicha filter
```bash
curl "http://localhost:8000/api/products/?category=stol-bezaklari"
```

### Qidiruv
```bash
curl "http://localhost:8000/api/products/?search=choy"
```

### Murojat yuborish
```bash
curl -X POST http://localhost:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ali Valiyev",
    "email": "ali@example.com",
    "phone": "+998901234567",
    "message": "Sizning mahsulotlaringiz juda yoqimli!"
  }'
```

---

## 🎨 Dizayn

- **Rang palitrasi:**
  - Primary (Ko'k): #2C5BA5
  - Accent (Qizil): #DC3545
  - Gold (Oltin): #DAA520
  - Surface ranglar va soft shadows
- **Font:** System fonts (optimizatsiya uchun)
- **UI Framework:** TailwindCSS
- **Responsive:** Mobil, Planshet, Desktop
- **Features:**
  - Logo support (navbar va footer)
  - Hero background image
  - Discount badges
  - Cart icons on marketplace buttons
  - Mobile-first design
  - Back navigation button

---

## 🐞 Muammolarni Hal Qilish

### Backend ishlamayapti?
```bash
# Virtual environmentni tekshiring
which python  # venv ichida python ko'rsatilishi kerak

# Paketlar o'rnatilganmi?
pip list

# Migrationlar amalga oshirilganmi?
python manage.py showmigrations
```

### Frontend ishlamayapti?
```bash
# Node.js versiyasini tekshiring
node -v  # 16+ bo'lishi kerak

# Paketlarni qayta o'rnatish
rm -rf node_modules package-lock.json
npm install

# Backendni tekshiring
curl http://localhost:8000/api/products/
```

### Rasmlar ko'rinmayapti?
1. `backend/media/products/` papkasi mavjudligini tekshiring
2. Django `MEDIA_ROOT` sozlamalarini tekshiring
3. Vite proxy sozlamalarini tekshiring

---

## 📦 Production Deploy

### Rasmlarni Qo'shish (Deploy'dan oldin)
1. **Logo** (`frontend/public/logo.png`)
   - Tavsiya: 200x200px, PNG format, shaffof fon
   - Ko'rinadi: Navbar va Footer'da

2. **Hero Background** (`frontend/public/hero-bg.jpg`)
   - Tavsiya: 1920x800px yoki kattaroq
   - Ko'rinadi: Bosh sahifada matn orqasida

### Backend (Railway/Render)
1. PostgreSQL database yarating
2. Environment variables:
   ```
   SECRET_KEY=your-secret-key
   DEBUG=False
   ALLOWED_HOSTS=yourdomain.com
   DATABASE_URL=postgresql://...
   CORS_ALLOWED_ORIGINS=https://moongift.uz
   ```
3. `python manage.py collectstatic`
4. `python manage.py migrate`

### Frontend (Vercel/Netlify)
1. Rasmlarni qo'shib bo'lgandan keyin build qiling
2. `npm run build`
3. Environment variables:
   ```
   VITE_API_URL=https://api.yourdomain.com
   ```
4. Deploy `dist/` papkani

---

## 📞 Yordam

Muammoga duch kelsangiz:
1. Django errorlarni `manage.py runserver` outputida ko'ring
2. Browser console'ni tekshiring (F12)
3. Network tabni tekshiring (API so'rovlar)

---

## 🎉 Tayyor!

Endi sizda to'liq ishlaydigan MoonGift loyihasi bor!

1. ✅ Backend API ishga tushdi
2. ✅ Frontend UI ishlayapti
3. ✅ Admin panel orqali mahsulot qo'shishingiz mumkin
4. ✅ Uzum Market'ga havola qilishingiz mumkin

**Omad tilaymiz! 🌙**