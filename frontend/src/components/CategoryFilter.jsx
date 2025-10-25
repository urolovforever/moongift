function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  // Array emasligini tekshirish
  if (!categories || !Array.isArray(categories)) {
    return null; // Yoki bo'sh div qaytaring
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Kategoriyalar</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-md transition-colors ${
            !selectedCategory
              ? 'bg-wood-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Barchasi
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedCategory === category.slug
                ? 'bg-wood-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name} ({category.product_count || 0})
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;