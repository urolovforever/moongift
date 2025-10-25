import { useEffect } from 'react';

function FilterSidebar({ 
  isOpen,
  onClose,
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset,
  resultCount
}) {
  // Escape tugmasi bilan yopish
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Body scroll'ni bloklash
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-wood-800">Filterlar</h2>
            <p className="text-sm text-gray-600">{resultCount} ta mahsulot</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Yopish"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Kategoriya */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              📦 Kategoriya
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onCategoryChange(null)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                  !selectedCategory
                    ? 'bg-wood-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Barchasi
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.slug)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-between ${
                    selectedCategory === category.slug
                      ? 'bg-wood-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.slug
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.product_count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Narx Oralig'i */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              💰 Narx Oralig'i
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Minimal narx (so'm)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => onPriceChange({ ...priceRange, min: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Maksimal narx (so'm)</label>
                <input
                  type="number"
                  placeholder="1000000"
                  value={priceRange.max}
                  onChange={(e) => onPriceChange({ ...priceRange, max: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sortlash */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🔄 Saralash
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Standart</option>
              <option value="price_asc">💵 Narx: Arzondan qimmatga</option>
              <option value="price_desc">💰 Narx: Qimmatdan arzonga</option>
              <option value="name_asc">🔤 Nomi: A-Z</option>
              <option value="name_desc">🔤 Nomi: Z-A</option>
              <option value="newest">🆕 Eng yangilari</option>
              <option value="oldest">⏰ Eng eskilari</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-2">
          <button
            onClick={onReset}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            🗑️ Filterlarni tozalash
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-wood-600 text-white rounded-lg font-semibold hover:bg-wood-700 transition-colors"
          >
            Natijalarni ko'rish
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;
