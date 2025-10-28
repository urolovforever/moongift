import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

  return (
    <div className="bg-surface-white rounded-card shadow-soft-md overflow-hidden hover:shadow-soft-hover hover:bg-primary-50 transition-all duration-300 group border border-light">
      <Link to={`/products/${product.slug}`}>
        <div className="relative overflow-hidden h-64">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {product.discount_percentage > 0 && (
            <span className="absolute top-3 left-3 bg-accent text-white text-xs px-3 py-1.5 rounded-button font-bold shadow-soft">
              -{product.discount_percentage}% 🏷️
            </span>
          )}
          {product.is_featured && (
            <span className="absolute top-3 right-3 bg-gold text-white text-xs px-3 py-1.5 rounded-button font-bold shadow-soft">⭐ Mashhur</span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-primary mb-2 hover:text-primary-700 transition-colors">{product.name}</h3>
        </Link>
        {product.discount_percentage > 0 ? (
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-2xl font-bold text-accent">{formatPrice(product.price * (1 - product.discount_percentage / 100))} so'm</p>
            </div>
            <div className="inline-block bg-surface-gray px-2 py-0.5 rounded">
              <p className="text-xs text-text-secondary line-through">{formatPrice(product.price)} so'm</p>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-2xl font-bold text-accent">{formatPrice(product.price)} so'm</p>
            </div>
            <div className="h-5"></div>
          </div>
        )}
        <div className={`flex ${product.yandex_market_link ? 'gap-2' : ''}`}>
          <a href={product.uzum_link} target="_blank" rel="noopener noreferrer" className={`${product.yandex_market_link ? 'flex-1' : 'w-full'} bg-primary text-white py-2 px-3 rounded-button hover:bg-primary-700 transition-colors flex items-center justify-center gap-1.5 font-semibold text-xs shadow-soft`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Uzum</span>
          </a>
          {product.yandex_market_link && (
            <a href={product.yandex_market_link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-accent text-white py-2 px-3 rounded-button hover:bg-accent/80 transition-colors flex items-center justify-center gap-1.5 font-semibold text-xs shadow-soft">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Yandex</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
