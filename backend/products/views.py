from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Category, Product
from .serializers import CategorySerializer, ProductListSerializer, ProductDetailSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'material']
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__slug=category)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
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
