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
