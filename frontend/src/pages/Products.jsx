import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      console.log('Categories response:', response.data);

      // Response array ekanligini tekshirish
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error('Categories is not an array:', response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Kategoriyalar yuklanmadi:', error);
      setError('Kategoriyalar yuklanmadi');
      setCategories([]); // Bo'sh array
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;

      const response = await getProducts(params);
      console.log('Products response:', response.data);

      // Response array yoki paginated object bo'lishi mumkin
      const productsData = response.data.results || response.data;

      if (Array.isArray(productsData)) {
        setProducts(productsData);
      } else {
        console.error('Products is not an array:', productsData);
        setProducts([]);
      }
    } catch (error) {
      console.error('Mahsulotlar yuklanmadi:', error);
      setError('Mahsulotlar yuklanmadi. Backend ishga tushganligini tekshiring.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-wood-800 mb-8">Mahsulotlar</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Xatolik:</strong> {error}
          <p className="text-sm mt-2">
            Backend serverni tekshiring: <code className="bg-red-200 px-2 py-1 rounded">python manage.py runserver</code>
          </p>
        </div>
      )}

      {/* Qidiruv */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Mahsulot qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500"
        />
        <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Kategoriya Filter */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {/* Mahsulotlar */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wood-600"></div>
          <p className="mt-4 text-wood-600">Yuklanmoqda...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md p-8">
          <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-xl text-gray-600 mb-2">Mahsulot topilmadi</p>
          <p className="text-gray-500">
            {searchQuery ? 'Qidiruv so\'rovi bo\'yicha mahsulot yo\'q' : 'Admin paneldan mahsulot qo\'shing'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;