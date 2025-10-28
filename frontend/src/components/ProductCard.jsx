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
        <p className="text-xs text-primary uppercase tracking-wide mb-2 font-semibold">{product.category_name}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-primary mb-2 hover:text-primary-700 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-2xl font-bold text-accent mb-4">{formatPrice(product.price)} so'm</p>
        <a href={product.uzum_link} target="_blank" rel="noopener noreferrer" className="w-full bg-primary text-white py-3 px-5 rounded-button hover:bg-primary-700 transition-colors flex items-center justify-center font-semibold text-base shadow-soft">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Buyurtma berish
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
