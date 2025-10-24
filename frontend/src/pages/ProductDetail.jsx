import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../api/api';
import ProductCard from '../components/ProductCard';

function ProductDetail() {
  const { slug } = useParams();
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src={selectedImage} alt={product.name} className="w-full h-96 object-cover rounded-lg mb-4" />
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(img)}>
                  <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-wood-700 mb-6">{formatPrice(product.price)} so'm</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <a href={product.uzum_link} target="_blank" rel="noopener noreferrer" className="block w-full bg-wood-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-wood-700">
            Uzum Market'da xarid qilish
          </a>
        </div>
      </div>

      {product.similar_products && product.similar_products.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">O'xshash mahsulotlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
