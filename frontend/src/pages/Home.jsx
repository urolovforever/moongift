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
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              🌙 MoonGift
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-6">
              Lazer texnologiyasi bilan yaratilgan noyob mahsulotlar
            </p>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Yog'och va boshqa materiallarga yuqori aniqlikdagi lazer ishlov berish orqali
              sizning orzuyingizdagi mahsulotlarni hayotga keltiramiz
            </p>
            <Link to="/products" className="inline-block bg-primary text-white px-10 py-4 rounded-button text-lg font-semibold hover:bg-accent transition-colors shadow-premium-lg">
              Mahsulotlarni ko'rish
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-accent-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-premium">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-3">Yuqori Sifat</h3>
              <p className="text-text-secondary">Har bir mahsulot diqqat bilan ishlab chiqiladi</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-premium">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-3">Tez Yetkazib Berish</h3>
              <p className="text-text-secondary">Uzum Market orqali tez va xavfsiz</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-accent-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-premium">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-3">Noyob Dizayn</h3>
              <p className="text-text-secondary">Maxsus buyurtma va individual dizayn</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">Mashhur Mahsulotlar</h2>
            <p className="text-xl text-text-secondary">Eng ko'p sotilgan va sevimli mahsulotlarimiz</p>
          </div>

          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-button mb-6">
              {error}. Backend serverni ishga tushiring: <code>python manage.py runserver</code>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-accent"></div>
              <p className="mt-6 text-xl text-text-secondary font-semibold">Yuklanmoqda...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-button shadow-premium">
              <p className="text-2xl text-text-main font-semibold mb-4">Mashhur mahsulotlar hali yo'q</p>
              <p className="text-lg text-text-secondary">Admin paneldan mahsulot qo'shing va "Is Featured" belgilang</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-14">
            <Link to="/products" className="inline-block bg-primary text-white px-10 py-4 rounded-button font-semibold text-lg hover:bg-accent transition-colors shadow-premium-lg">
              Barcha mahsulotlar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
