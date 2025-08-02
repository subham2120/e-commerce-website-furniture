@extends('layouts.app')

@section('title', 'Products - FurniStore')

@section('content')
<!-- Breadcrumb -->
<nav class="bg-light py-3">
    <div class="container">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
            <li class="breadcrumb-item active">Products</li>
        </ol>
    </div>
</nav>

<div class="container py-4">
    <div class="row">
        <!-- Filters Sidebar -->
        <div class="col-lg-3 mb-4">
            <div class="filters-sidebar bg-light p-4 rounded">
                <h5 class="fw-bold mb-4">Filters</h5>
                
                <form id="filter-form" method="GET" action="{{ route('products.index') }}">
                    <!-- Price Range -->
                    <div class="filter-group mb-4">
                        <h6 class="filter-title">Price Range</h6>
                        <div class="mb-3">
                            <label for="priceRange" class="form-label">₹0 - ₹100,000</label>
                            <input type="range" class="form-range" id="priceRange" min="0" max="100000" value="{{ request('max_price', 100000) }}">
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <input type="number" name="min_price" class="form-control form-control-sm" 
                                       placeholder="Min" value="{{ request('min_price') }}">
                            </div>
                            <div class="col-6">
                                <input type="number" name="max_price" class="form-control form-control-sm" 
                                       placeholder="Max" value="{{ request('max_price') }}">
                            </div>
                        </div>
                    </div>

                    <!-- Categories -->
                    <div class="filter-group mb-4">
                        <h6 class="filter-title">Categories</h6>
                        @foreach($categories as $category)
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="category" 
                                       id="category-{{ $category->id }}" value="{{ $category->slug }}"
                                       {{ request('category') == $category->slug ? 'checked' : '' }}>
                                <label class="form-check-label" for="category-{{ $category->id }}">
                                    {{ $category->name }}
                                </label>
                            </div>
                        @endforeach
                    </div>

                    <button type="submit" class="btn btn-primary w-100 mb-2">Apply Filters</button>
                    <a href="{{ route('products.index') }}" class="btn btn-outline-secondary w-100">Clear Filters</a>
                </form>
            </div>
        </div>

        <!-- Products Section -->
        <div class="col-lg-9">
            <!-- Products Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="fw-bold mb-1">All Products</h2>
                    <p class="text-muted mb-0">{{ $products->total() }} products found</p>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <form method="GET" action="{{ route('products.index') }}" class="d-flex align-items-center">
                        @foreach(request()->except('sort') as $key => $value)
                            <input type="hidden" name="{{ $key }}" value="{{ $value }}">
                        @endforeach
                        <label for="sortBy" class="form-label me-2 mb-0">Sort by:</label>
                        <select name="sort" class="form-select" id="sortBy" onchange="this.form.submit()">
                            <option value="featured" {{ request('sort') == 'featured' ? 'selected' : '' }}>Featured</option>
                            <option value="price_low" {{ request('sort') == 'price_low' ? 'selected' : '' }}>Price: Low to High</option>
                            <option value="price_high" {{ request('sort') == 'price_high' ? 'selected' : '' }}>Price: High to Low</option>
                            <option value="rating" {{ request('sort') == 'rating' ? 'selected' : '' }}>Customer Rating</option>
                            <option value="newest" {{ request('sort') == 'newest' ? 'selected' : '' }}>Newest First</option>
                        </select>
                    </form>
                </div>
            </div>

            <!-- Products Grid -->
            <div class="row g-4">
                @forelse($products as $product)
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card product-card h-100 shadow-sm">
                            <div class="position-relative">
                                <a href="{{ route('products.show', $product->slug) }}">
                                    <img src="{{ $product->main_image }}" class="card-img-top product-image" alt="{{ $product->name }}">
                                </a>
                                @if($product->discount_percentage > 0)
                                    <span class="badge bg-danger product-badge">{{ $product->discount_percentage }}% OFF</span>
                                @endif
                                <div class="product-actions">
                                    <button class="btn btn-light btn-sm rounded-circle me-2" onclick="toggleWishlist({{ $product->id }})">
                                        <i class="far fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body d-flex flex-column">
                                <small class="text-muted">{{ $product->category->name }}</small>
                                <h6 class="card-title fw-bold">
                                    <a href="{{ route('products.show', $product->slug) }}" class="text-decoration-none text-dark">
                                        {{ $product->name }}
                                    </a>
                                </h6>
                                <p class="card-text text-muted small">{{ Str::limit($product->short_description, 80) }}</p>
                                <div class="d-flex align-items-center mb-2">
                                    <div class="star-rating me-2">
                                        @for($i = 1; $i <= 5; $i++)
                                            @if($i <= $product->average_rating)
                                                <i class="fas fa-star text-warning"></i>
                                            @elseif($i - 0.5 <= $product->average_rating)
                                                <i class="fas fa-star-half-alt text-warning"></i>
                                            @else
                                                <i class="far fa-star text-warning"></i>
                                            @endif
                                        @endfor
                                    </div>
                                    <small class="text-muted">({{ $product->total_reviews }})</small>
                                </div>
                                <div class="mb-3">
                                    <span class="price-current text-success fw-bold">₹{{ number_format($product->price) }}</span>
                                    @if($product->original_price > $product->price)
                                        <span class="price-original ms-2 text-muted text-decoration-line-through">₹{{ number_format($product->original_price) }}</span>
                                    @endif
                                </div>
                                <div class="mt-auto">
                                    @if($product->stock_quantity > 0)
                                        <button class="btn btn-primary w-100 add-to-cart" data-product-id="{{ $product->id }}">
                                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                        </button>
                                    @else
                                        <button class="btn btn-secondary w-100" disabled>
                                            Out of Stock
                                        </button>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="text-center py-5">
                            <i class="fas fa-search fs-1 text-muted mb-3"></i>
                            <h4>No products found</h4>
                            <p class="text-muted">Try adjusting your search or filter criteria</p>
                            <a href="{{ route('products.index') }}" class="btn btn-primary">View All Products</a>
                        </div>
                    </div>
                @endforelse
            </div>

            <!-- Pagination -->
            @if($products->hasPages())
                <div class="d-flex justify-content-center mt-5">
                    {{ $products->appends(request()->query())->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection

@push('styles')
<style>
.filters-sidebar {
    position: sticky;
    top: 100px;
}

.product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.product-image {
    height: 250px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-card:hover .product-image {
    transform: scale(1.05);
}

.product-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
}

.product-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.product-card:hover .product-actions {
    opacity: 1;
}
</style>
@endpush

@push('scripts')
<script>
$(document).ready(function() {
    // Add to cart functionality
    $('.add-to-cart').click(function() {
        const productId = $(this).data('product-id');
        
        @auth
            $.ajax({
                url: '{{ route("cart.add") }}',
                method: 'POST',
                data: {
                    _token: '{{ csrf_token() }}',
                    product_id: productId,
                    quantity: 1
                },
                success: function(response) {
                    if (response.success) {
                        $('#cart-badge').text(response.cart_count);
                        showNotification(response.message, 'success');
                    } else {
                        showNotification(response.message, 'error');
                    }
                }
            });
        @else
            window.location.href = '{{ route("login") }}';
        @endauth
    });

    // Price range slider
    $('#priceRange').on('input', function() {
        const value = $(this).val();
        $('label[for="priceRange"]').text(`₹0 - ₹${parseInt(value).toLocaleString()}`);
        $('input[name="max_price"]').val(value);
    });
});

function toggleWishlist(productId) {
    @auth
        // Wishlist toggle logic here
        showNotification('Added to wishlist!', 'info');
    @else
        window.location.href = '{{ route("login") }}';
    @endauth
}

function showNotification(message, type) {
    const alertClass = type === 'success' ? 'alert-success' : 
                      type === 'error' ? 'alert-danger' : 'alert-info';
    
    const alertDiv = `
        <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
             style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('body').append(alertDiv);
    
    setTimeout(() => {
        $('.alert').fadeOut();
    }, 3000);
}
</script>
@endpush
