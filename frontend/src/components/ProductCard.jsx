import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

  // Chegirma badge rang va ko'rinishni aniqlash
  const getDiscountBadgeClass = () => {
    if (product.discount_percentage >= 15) {
      return 'bg-red-500 text-white'; // 15%+ qizil
    } else if (product.discount_percentage >= 5) {
      return 'bg-yellow-400 text-gray-900'; // 5-15% sariq
    }
    return null; // 5% dan kam - ko'rinmasin
  };

  const discountBadgeClass = getDiscountBadgeClass();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      <Link to={`/products/${product.slug}`}>
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges Container - yuqori chap burchakda */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {/* Chegirma Badge - faqat 5% dan ko'p bo'lsa */}
            {discountBadgeClass && (
              <span className={`${discountBadgeClass} text-xs px-2 py-1 rounded-lg font-bold shadow-lg backdrop-blur-sm`}>
                -{product.discount_percentage}%
              </span>
            )}

            {/* Mashhur Badge - chegirma badge ostida */}
            {product.is_featured && (
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-lg backdrop-blur-sm flex items-center gap-1">
                <span>⭐</span>
                <span>TOP</span>
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Narx */}
        {product.discount_percentage >= 5 ? (
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-red-600">
                {formatPrice(product.price * (1 - product.discount_percentage / 100))} so'm
              </p>
            </div>
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(product.price)} so'm
            </p>
          </div>
        ) : (
          <div className="mb-3">
            <p className="text-xl font-bold text-gray-800">
              {formatPrice(product.price)} so'm
            </p>
          </div>
        )}

        {/* Tugmalar - mobilda yonma-yon */}
        <div className="flex gap-2">
          <a
            href={product.uzum_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${product.yandex_market_link ? 'flex-1' : 'w-full'} bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-1.5 font-medium text-sm`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Uzum</span>
          </a>

          {product.yandex_market_link && (
            <a
              href={product.yandex_market_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-1.5 font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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
