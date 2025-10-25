function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-wood-800">Filterlar</h3>
        <button
          onClick={onReset}
          className="text-sm text-wood-600 hover:text-wood-800 underline"
        >
          Tozalash
        </button>
      </div>

      {/* Kategoriya Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Kategoriya
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              console.log('🔘 Barchasi bosildi');
              onCategoryChange(null);
            }}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              !selectedCategory
                ? 'bg-wood-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Barchasi
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                console.log('🔘 Kategoriya bosildi:', category.slug);
                onCategoryChange(category.slug);
              }}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-wood-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.product_count})
            </button>
          ))}
        </div>
      </div>

      {/* Narx Oralig'i */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Narx Oralig'i (so'm)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Dan</label>
            <input
              type="number"
              placeholder="0"
              value={priceRange.min}
              onChange={(e) => {
                console.log('💰 Min narx:', e.target.value);
                onPriceChange({ ...priceRange, min: e.target.value });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wood-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Gacha</label>
            <input
              type="number"
              placeholder="1000000"
              value={priceRange.max}
              onChange={(e) => {
                console.log('💰 Max narx:', e.target.value);
                onPriceChange({ ...priceRange, max: e.target.value });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wood-500"
            />
          </div>
        </div>
      </div>

      {/* Sortlash */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Saralash
        </label>
        <select
          value={sortBy}
          onChange={(e) => {
            console.log('🔄 Saralash:', e.target.value);
            onSortChange(e.target.value);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wood-500"
        >
          <option value="">Standart</option>
          <option value="price_asc">Narx: Arzondan qimmatga</option>
          <option value="price_desc">Narx: Qimmatdan arzonga</option>
          <option value="name_asc">Nomi: A-Z</option>
          <option value="name_desc">Nomi: Z-A</option>
          <option value="newest">Eng yangilari</option>
          <option value="oldest">Eng eskilari</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;