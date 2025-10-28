from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'product_count']
    
    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'category', 'category_name', 'price', 'image', 'uzum_link', 'yandex_market_link', 'discount_percentage', 'is_featured']


class ProductDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    similar_products = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'category', 'category_name', 'description', 'price',
                  'image', 'image_2', 'image_3', 'uzum_link', 'yandex_market_link',
                  'discount_percentage', 'is_featured', 'created_at', 'similar_products']
    
    def get_similar_products(self, obj):
        similar = Product.objects.filter(category=obj.category, is_active=True).exclude(id=obj.id)[:4]
        return ProductListSerializer(similar, many=True, context=self.context).data
