#!/bin/bash

cd ~/PycharmProjects/moon/frontend

echo "🔧 Vite va React Router muammosini to'liq tuzatish..."

# ==========================================
# 1. vite.config.js - HMR sozlamalari bilan
# ==========================================
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    hmr: {
      overlay: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
EOF

# ==========================================
# 2. src/App.jsx - Scroll Restore bilan
# ==========================================
cat > src/App.jsx << 'EOF'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-wood-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
EOF

# ==========================================
# 3. index.html - To'liq optimizatsiya
# ==========================================
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MoonGift - Lazer Yog'och Ishlov Berish</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# ==========================================
# 4. src/main.jsx - StrictMode'siz
# ==========================================
cat > src/main.jsx << 'EOF'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
EOF

# ==========================================
# 5. Loading Component yaratish
# ==========================================
mkdir -p src/components
cat > src/components/Loading.jsx << 'EOF'
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-wood-600"></div>
        <p className="mt-4 text-wood-600 text-lg">Yuklanmoqda...</p>
      </div>
    </div>
  );
}

export default Loading;
EOF

# ==========================================
# 6. Products.jsx - Loading state bilan
# ==========================================
cat > src/pages/Products.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Loading from '../components/Loading';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Kategoriyalar yuklanmadi:', error);
      setError('Kategoriyalar yuklanmadi');
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      
      const response = await getProducts(params);
      setProducts(response.data.results || response.data);
    } catch (error) {
      console.error('Mahsulotlar yuklanmadi:', error);
      setError('Mahsulotlar yuklanmadi. Backend ishga tushganligini tekshiring.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && products.length === 0) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-wood-800 mb-8">Mahsulotlar</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Mahsulot qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500"
        />
        <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wood-600"></div>
          <p className="mt-4 text-wood-600">Yuklanmoqda...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Mahsulot topilmadi</p>
          <p className="text-gray-500 mt-2">Admin paneldan mahsulot qo'shing</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
EOF

# ==========================================
# 7. Home.jsx - Loading state bilan
# ==========================================
cat > src/pages/Home.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../api/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await getFeaturedProducts();
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Xatolik:', error);
      setError('Backend bilan bog\'lanishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-wood-100 to-wood-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-wood-800 mb-6">
              🌙 MoonGift
            </h1>
            <p className="text-xl md:text-2xl text-wood-700 mb-8">
              Lazer texnologiyasi bilan yaratilgan noyob mahsulotlar
            </p>
            <p className="text-lg text-wood-600 mb-8 max-w-2xl mx-auto">
              Yog'och va boshqa materiallarga yuqori aniqlikdagi lazer ishlov berish orqali 
              sizning orzuyingizdagi mahsulotlarni hayotga keltiramiz
            </p>
            <Link to="/products" className="inline-block bg-wood-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-wood-700 transition-colors">
              Mahsulotlarni ko'rish
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-wood-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Yuqori Sifat</h3>
              <p className="text-gray-600">Har bir mahsulot diqqat bilan ishlab chiqiladi</p>
            </div>
            <div className="text-center">
              <div className="bg-wood-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tez Yetkazib Berish</h3>
              <p className="text-gray-600">Uzum Market orqali tez va xavfsiz</p>
            </div>
            <div className="text-center">
              <div className="bg-wood-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Noyob Dizayn</h3>
              <p className="text-gray-600">Maxsus buyurtma va individual dizayn</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-wood-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-wood-800 mb-4">Mashhur Mahsulotlar</h2>
            <p className="text-lg text-wood-600">Eng ko'p sotilgan va sevimli mahsulotlarimiz</p>
          </div>

          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
              {error}. Backend serverni ishga tushiring: <code>python manage.py runserver</code>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wood-600"></div>
              <p className="mt-4 text-wood-600">Yuklanmoqda...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-xl text-gray-600 mb-4">Mashhur mahsulotlar hali yo'q</p>
              <p className="text-gray-500">Admin paneldan mahsulot qo'shing va "Is Featured" belgilang</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="inline-block bg-wood-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-wood-700 transition-colors">
              Barcha mahsulotlar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
EOF

echo "✅ Barcha fayllar yangilandi!"
echo ""
echo "📋 Endi quyidagilarni bajaring:"
echo ""
echo "1. Vite serverni to'xtating (Ctrl+C)"
echo "2. Node modullarni tozalang:"
echo "   rm -rf node_modules .vite"
echo "   npm install"
echo "3. Serverni ishga tushiring:"
echo "   npm run dev"
echo "4. Browser'ni to'liq yangilang: Ctrl+Shift+R"
echo "5. Console'ni tekshiring: F12"
