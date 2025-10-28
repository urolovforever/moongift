import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '../api/api';
import ProductCard from '../components/ProductCard';

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
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
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:text-primary-700 font-semibold mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Orqaga</span>
      </button>

      <div className="grid grid-cols-2 gap-4 md:gap-12">
        <div>
          <div className="relative">
            <img src={selectedImage} alt={product.name} className="w-full h-48 md:h-96 object-cover rounded-card mb-2 md:mb-4 shadow-soft-md" />
            {product.discount_percentage > 0 && (
              <span className="absolute top-1 left-1 md:top-4 md:left-4 bg-accent text-white text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 rounded-button font-bold shadow-soft-md">
                -{product.discount_percentage}%
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {images.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(img)} className="overflow-hidden rounded-button border-2 border-light hover:border-primary transition-colors">
                  <img src={img} alt="" className="w-full h-12 md:h-24 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-base md:text-4xl font-bold text-text-primary mb-2 md:mb-4">{product.name}</h1>
          {product.discount_percentage > 0 ? (
            <div className="mb-3 md:mb-6">
              <p className="text-xs md:text-2xl text-text-secondary line-through">{formatPrice(product.price)} so'm</p>
              <p className="text-lg md:text-4xl font-bold text-accent">{formatPrice(product.price * (1 - product.discount_percentage / 100))} so'm</p>
              <span className="inline-block mt-1 md:mt-2 bg-accent-50 text-accent px-2 py-0.5 md:px-3 md:py-1 rounded-button text-xs md:text-sm font-bold">
                Tejaysiz: {formatPrice(product.price * (product.discount_percentage / 100))} so'm
              </span>
            </div>
          ) : (
            <p className="text-lg md:text-4xl font-bold text-accent mb-3 md:mb-6">{formatPrice(product.price)} so'm</p>
          )}
          <p className="text-xs md:text-lg text-text-secondary mb-4 md:mb-8 leading-relaxed">{product.description}</p>
          <div className="space-y-2 md:space-y-3">
            <a href={product.uzum_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 w-full bg-primary text-white text-center py-2 md:py-4 rounded-button font-semibold text-xs md:text-lg hover:bg-primary-700 transition-colors shadow-soft-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden md:inline">Buyurtma berish (Uzum Market)</span>
              <span className="md:hidden">Uzum</span>
            </a>
            {product.yandex_market_link && (
              <a href={product.yandex_market_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 w-full bg-accent text-white text-center py-2 md:py-4 rounded-button font-semibold text-xs md:text-lg hover:bg-accent/80 transition-colors shadow-soft-md">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden md:inline">Buyurtma berish (Yandex Market)</span>
                <span className="md:hidden">Yandex</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {product.similar_products && product.similar_products.length > 0 && (
        <div className="mt-8 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 md:mb-8">O'xshash mahsulotlar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
