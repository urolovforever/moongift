import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/products/${product.slug}`}>
        <div className="relative overflow-hidden h-64">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          {product.is_featured && (
            <span className="absolute top-2 right-2 bg-accent-600 text-white text-xs px-2 py-1 rounded font-semibold">Mashhur</span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-primary-600 uppercase tracking-wide mb-1 font-semibold">{product.category_name}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-700 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xl font-bold text-accent-600 mb-4">{formatPrice(product.price)} so'm</p>
        <a href={product.uzum_link} target="_blank" rel="noopener noreferrer" className="w-full bg-accent-600 text-white py-2 px-4 rounded-md hover:bg-accent-700 transition-colors flex items-center justify-center font-semibold">
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
