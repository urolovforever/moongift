from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Category, Product
from .serializers import CategorySerializer, ProductListSerializer, ProductDetailSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    """Mahsulotlar ro'yxati - filter, qidiruv va ordering bilan"""
    serializer_class = ProductListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'material']
    ordering_fields = ['price', 'name', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)

        # Debug: Parametrlarni chiqarish
        print("=" * 50)
        print("API Query Params:", dict(self.request.query_params))
        print("=" * 50)

        # Kategoriya filter (slug bo'yicha)
        category = self.request.query_params.get('category', None)
        if category:
            print(f"Category filter: {category}")
            # Avval slug bo'yicha
            queryset = queryset.filter(category__slug=category)
            print(f"After category filter: {queryset.count()} mahsulot")

        # Narx oralig'i filter
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)

        if min_price:
            print(f"Min price filter: {min_price}")
            try:
                queryset = queryset.filter(price__gte=float(min_price))
                print(f"After min_price filter: {queryset.count()} mahsulot")
            except ValueError:
                print(f"Invalid min_price: {min_price}")

        if max_price:
            print(f"Max price filter: {max_price}")
            try:
                queryset = queryset.filter(price__lte=float(max_price))
                print(f"After max_price filter: {queryset.count()} mahsulot")
            except ValueError:
                print(f"Invalid max_price: {max_price}")

        print(f"Final queryset: {queryset.count()} mahsulot")
        print("=" * 50)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'


class FeaturedProductsView(APIView):
    def get(self, request):
        products = Product.objects.filter(is_active=True, is_featured=True)[:4]
        serializer = ProductListSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)