#!/bin/bash

# Frontend papkasiga o'ting
cd ~/PycharmProjects/moon/frontend

echo "🔧 Frontend fayllarni yaratish..."

# src/pages/ papkasini yaratish
mkdir -p src/pages
mkdir -p src/components
mkdir -p src/api

# ==========================================
# 1. src/api/api.js
# ==========================================
cat > src/api/api.js << 'EOF'
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getCategories = () => api.get('/products/categories/');
export const getProducts = (params = {}) => api.get('/products/', { params });
export const getFeaturedProducts = () => api.get('/products/featured/');
export const getProductBySlug = (slug) => api.get(`/products/${slug}/`);
export const sendContactMessage = (data) => api.post('/contact/', data);

export default api;
EOF

# ==========================================
# 2. src/components/Navbar.jsx
# ==========================================
cat > src/components/Navbar.jsx << 'EOF'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Bosh sahifa' },
    { path: '/products', label: 'Mahsulotlar' },
    { path: '/about', label: 'Biz haqimizda' },
    { path: '/contact', label: "Bog'lanish" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-wood-700">🌙 MoonGift</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path) ? 'text-wood-700 font-semibold' : 'text-gray-600 hover:text-wood-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-md text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md ${
                  isActive(link.path) ? 'bg-wood-100 text-wood-700 font-semibold' : 'text-gray-600 hover:bg-wood-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
EOF

# ==========================================
# 3. src/components/Footer.jsx
# ==========================================
cat > src/components/Footer.jsx << 'EOF'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-wood-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🌙 MoonGift</h3>
            <p className="text-wood-200 mb-4">Lazer texnologiyasi yordamida yog'och va boshqa materiallarga yuqori sifatli ishlov berish.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-wood-200 hover:text-white">Mahsulotlar</Link></li>
              <li><Link to="/about" className="text-wood-200 hover:text-white">Biz haqimizda</Link></li>
              <li><Link to="/contact" className="text-wood-200 hover:text-white">Bog'lanish</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Aloqa</h3>
            <ul className="space-y-2 text-wood-200">
              <li>📞 +998 90 123 45 67</li>
              <li>📍 Toshkent, O'zbekiston</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-wood-700 mt-8 pt-8 text-center text-wood-300">
          <p>&copy; 2025 MoonGift. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
EOF

# ==========================================
# 4. src/components/ProductCard.jsx
# ==========================================
cat > src/components/ProductCard.jsx << 'EOF'
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/products/${product.slug}`}>
        <div className="relative overflow-hidden h-64">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          {product.is_featured && (
            <span className="absolute top-2 right-2 bg-wood-600 text-white text-xs px-2 py-1 rounded">Mashhur</span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-wood-500 uppercase tracking-wide mb-1">{product.category_name}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-wood-600">{product.name}</h3>
        </Link>
        <p className="text-xl font-bold text-wood-700 mb-4">{formatPrice(product.price)} so'm</p>
        <a href={product.uzum_link} target="_blank" rel="noopener noreferrer" className="w-full bg-wood-600 text-white py-2 px-4 rounded-md hover:bg-wood-700 transition-colors flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Uzum'da ko'rish
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
EOF

# ==========================================
# 5. src/components/CategoryFilter.jsx
# ==========================================
cat > src/components/CategoryFilter.jsx << 'EOF'
function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Kategoriyalar</h3>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => onSelectCategory(null)} className={`px-4 py-2 rounded-md transition-colors ${!selectedCategory ? 'bg-wood-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
          Barchasi
        </button>
        {categories.map((category) => (
          <button key={category.id} onClick={() => onSelectCategory(category.slug)} className={`px-4 py-2 rounded-md transition-colors ${selectedCategory === category.slug ? 'bg-wood-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            {category.name} ({category.product_count})
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
EOF

# ==========================================
# 6. src/pages/Home.jsx
# ==========================================
cat > src/pages/Home.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../api/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await getFeaturedProducts();
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-wood-100 to-wood-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-wood-800 mb-6">🌙 MoonGift</h1>
            <p className="text-xl md:text-2xl text-wood-700 mb-8">Lazer texnologiyasi bilan yaratilgan noyob mahsulotlar</p>
            <Link to="/products" className="inline-block bg-wood-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-wood-700 transition-colors">
              Mahsulotlarni ko'rish
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-wood-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-wood-800 mb-4">Mashhur Mahsulotlar</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wood-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
EOF

# ==========================================
# 7. src/pages/Products.jsx
# ==========================================
cat > src/pages/Products.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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
      console.error('Xatolik:', error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      
      const response = await getProducts(params);
      setProducts(response.data.results || response.data);
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-wood-800 mb-8">Mahsulotlar</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Mahsulot qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500"
        />
      </div>

      <CategoryFilter categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wood-600"></div>
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
# 8. src/pages/ProductDetail.jsx
# ==========================================
cat > src/pages/ProductDetail.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../api/api';
import ProductCard from '../components/ProductCard';

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const response = await getProductBySlug(slug);
      setProduct(response.data);
      setSelectedImage(response.data.image);
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

  if (loading) return <div className="text-center py-12">Yuklanmoqda...</div>;
  if (!product) return <div className="text-center py-12">Mahsulot topilmadi</div>;

  const images = [product.image, product.image_2, product.image_3].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src={selectedImage} alt={product.name} className="w-full h-96 object-cover rounded-lg mb-4" />
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(img)}>
                  <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-wood-700 mb-6">{formatPrice(product.price)} so'm</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <a href={product.uzum_link} target="_blank" rel="noopener noreferrer" className="block w-full bg-wood-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-wood-700">
            Uzum Market'da xarid qilish
          </a>
        </div>
      </div>

      {product.similar_products && product.similar_products.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">O'xshash mahsulotlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {product.similar_products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
EOF

# ==========================================
# 9. src/pages/About.jsx
# ==========================================
cat > src/pages/About.jsx << 'EOF'
function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-wood-800 mb-8">Biz haqimizda</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-700 mb-4 leading-relaxed">
          MoonGift zamonaviy lazer texnologiyasidan foydalanib, yog'och va boshqa materiallarga yuqori aniqlikdagi 
          ishlov berish xizmatlarini taqdim etadi.
        </p>
      </div>
    </div>
  );
}

export default About;
EOF

# ==========================================
# 10. src/pages/Contact.jsx
# ==========================================
cat > src/pages/Contact.jsx << 'EOF'
import { useState } from 'react';
import { sendContactMessage } from '../api/api';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-wood-800 mb-8">Bog'lanish</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        {success && <div className="bg-green-100 p-4 rounded mb-4">Xabar yuborildi!</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="text" placeholder="Ism" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="mb-4">
            <textarea placeholder="Xabar" required rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 border rounded-lg"></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-wood-600 text-white py-3 rounded-lg hover:bg-wood-700">
            {loading ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
EOF

# ==========================================
# 11. src/pages/NotFound.jsx
# ==========================================
cat > src/pages/NotFound.jsx << 'EOF'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-9xl font-bold text-wood-600">404</h1>
      <p className="text-2xl mb-8">Sahifa topilmadi</p>
      <Link to="/" className="bg-wood-600 text-white px-8 py-3 rounded-lg hover:bg-wood-700">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}

export default NotFound;
EOF

echo "✅ Barcha frontend fayllar yaratildi!"
echo ""
echo "Endi serverni qayta ishga tushiring:"
echo "npm run dev"

