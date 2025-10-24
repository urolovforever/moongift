#!/bin/bash
# MoonGift - Tezkor Ishga Tushirish
# Bu buyruqlarni ketma-ket bajaring

echo "🌙 MoonGift loyihasini ishga tushirish"
echo ""

# ========================================
# BACKEND ISHGA TUSHIRISH
# ========================================

echo "📦 BACKEND SETUP"
echo "================"
echo ""
echo "1. Backend papkasiga o'tish:"
echo "   cd moongift/backend"
echo ""
echo "2. Virtual environment yaratish:"
echo "   python -m venv venv"
echo ""
echo "3. Virtual environmentni aktivlashtirish:"
echo "   # Linux/Mac:"
echo "   source venv/bin/activate"
echo "   # Windows:"
echo "   venv\\Scripts\\activate"
echo ""
echo "4. Paketlarni o'rnatish:"
echo "   pip install -r requirements.txt"
echo ""
echo "5. Database migration:"
echo "   python manage.py makemigrations"
echo "   python manage.py migrate"
echo ""
echo "6. Superuser yaratish:"
echo "   python manage.py createsuperuser"
echo ""
echo "7. Backend serverni ishga tushirish:"
echo "   python manage.py runserver"
echo ""
echo "   ✅ Backend: http://localhost:8000"
echo "   ✅ Admin: http://localhost:8000/admin"
echo ""

# ========================================
# FRONTEND ISHGA TUSHIRISH
# ========================================

echo "🎨 FRONTEND SETUP (yangi terminalda)"
echo "===================================="
echo ""
echo "1. Frontend papkasiga o'tish:"
echo "   cd moongift/frontend"
echo ""
echo "2. Node paketlarini o'rnatish:"
echo "   npm install"
echo ""
echo "3. Frontend serverni ishga tushirish:"
echo "   npm run dev"
echo ""
echo "   ✅ Frontend: http://localhost:5173"
echo ""

# ========================================
# TEST MA'LUMOTLAR QO'SHISH
# ========================================

echo "📝 TEST MA'LUMOTLAR"
echo "==================="
echo ""
echo "Admin panelga kiring va quyidagilarni qo'shing:"
echo ""
echo "Kategoriyalar:"
echo "  - Stol bezaklari"
echo "  - Sovg'alar"
echo "  - Devoriy panellar"
echo "  - Maxsus buyurtmalar"
echo ""
echo "Mahsulot namunasi:"
echo "  - Nomi: Yog'och choy taxtasi"
echo "  - Kategoriya: Stol bezaklari"
echo "  - Narx: 150000"
echo "  - Material: Qayin yog'ochi"
echo "  - O'lcham: 30x20x2 sm"
echo "  - Rasm: yuklab oling"
echo "  - Uzum Link: https://uzum.uz/product/..."
echo "  - Is Featured: ✅"
echo ""

# ========================================
# FOYDALI BUYRUQLAR
# ========================================

echo "🔧 FOYDALI BUYRUQLAR"
echo "===================="
echo ""
echo "Backend:
echo "  python manage.py makemigrations    # Yangi modellar uchun"
echo "  python manage.py migrate           # DB yangilash"
echo "  python manage.py createsuperuser   # Yangi admin"
echo "  python manage.py collectstatic     # Static fayllar"
echo ""
echo "Frontend:"
echo "  npm run dev      # Development server"
echo "  npm run build    # Production build"
echo "  npm run preview  # Preview build"
echo ""

echo "✅ Setup tayyor! Omad tilaymiz! 🌙"
