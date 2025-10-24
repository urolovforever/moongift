from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView, FeaturedProductsView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('', ProductListView.as_view(), name='product-list'),
    path('featured/', FeaturedProductsView.as_view(), name='featured-products'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]
