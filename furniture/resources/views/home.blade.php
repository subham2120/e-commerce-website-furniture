@extends('layouts.app')

@section('title', 'FurniStore - Premium Furniture for Home & Office')

@section('content')
<!-- Hero Section -->
<section class="hero-section bg-gradient-primary text-white py-5">
    <div class="container py-5">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h1 class="display-4 fw-bold mb-4">Transform Your Space with Premium Furniture</h1>
                <p class="lead mb-4">
                    Discover our exclusive collection of modern, comfortable, and stylish furniture for every room in your home and office.
                </p>
                <div class="d-flex gap-3">
                    <a href="{{ route('products.index') }}" class="btn btn-light btn-lg text-primary">
                        Shop Now <i class="fas fa-arrow-right ms-2"></i>
                    </a>
                    <a href="#" class="btn btn-outline-light btn-lg">View Catalog</a>
                </div>
            </div>
            <div class="col-lg-6">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Premium Furniture" class="img-fluid rounded shadow-lg">
            </div>
        </div>
    </div>
</section>

<!-- Features -->
<section class="py-5 bg-light">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-4 text-center">
                <div class="feature-icon bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                    <i class="fas fa-truck text-primary fs-2"></i>
                </div>
                <h5 class="fw-bold">Free Delivery</h5>
                <p class="text-muted">Free delivery on orders above ₹25,000</p>
            </div>
            <div class="col-md-4 text-center">
                <div class="feature-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                    <i class="fas fa-shield-alt text-success fs-2"></i>
                </div>
                <h5 class="fw-bold">Quality Guarantee</h5>
                <p class="text-muted">5-year warranty on all products</p>
            </div>
            <div class="col-md-4 text-center">
                <div class="feature-icon bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                    <i class="fas fa-headset text-info fs-2"></i>
                </div>
                <h5 class="fw-bold">24/7 Support</h5>
                <p class="text-muted">Round-the-clock customer support</p>
            </div>
        </div>
    </div>
</section>

<!-- Categories -->
<section class="py-5">
    <div class="container">
        <div class="text-center mb-5">
            <h2 class="fw-bold mb-3">Shop by Category</h2>
            <p class="text-muted">Explore our wide range of furniture categories designed to meet all your home and office needs.</p>
        </div>
        <div class="row g-4">
            @foreach($categories as $category)
                <div class="col-lg-2 col-md-4 col-6">
                    <a href="{{ route('products.index', ['category' => $category->slug]) }}" class="text-decoration-none">
                        <div class="card h-100 border-0 shadow-sm category-card">
                            <div class="card-body text-center p-3">
                                <img src="{{ $category->image ?: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }}" 
                                     alt="{{ $category->name }}" class="img-fluid mb-3 rounded">
                                <h6 class="fw-bold mb-1">{{ $category->name }}</h6>
                                <small class="text-muted">{{ $category->products_count }} items</small>
                            </div>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- Featured Products -->
<section class="py-5 bg-light">
    <div class="container">
        <div class="text-center mb-5">
            <h2 class="fw-bold mb-3">Featured Products</h2>
            <p class="text-muted">Discover our handpicked selection of premium furniture pieces that combine style, comfort, and functionality.</p>
        </div>
        <div class="row g-4">
            @foreach($featuredProducts as $product)
                <div class="col-lg-3 col-md-6 mb-4">
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
            @endforeach
        </div>
        <div class="text-center mt-4">
            <a href="{{ route('products.index') }}" class="btn btn-outline-primary btn-lg">
                View All Products <i class="fas fa-arrow-right ms-2"></i>
            </a>
        </div>
    </div>
</section>

<!-- Newsletter -->
<section class="py-5 bg-primary text-white">
    <div class="container text-center">
        <h2 class="fw-bold mb-3">Stay Updated</h2>
        <p class="mb-4">Subscribe to our newsletter and be the first to know about new arrivals, special offers, and exclusive deals.</p>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form id="newsletter-form">
                    @csrf
                    <div class="input-group">
                        <input type="email" name="email" class="form-control" placeholder="Enter your email" required>
                        <button class="btn btn-light text-primary" type="submit">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
@endsection

@push('styles')
<style>
.hero-section {
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    min-height: 500px;
}

.feature-icon {
    width: 80px;
    height: 80px;
}

.category-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
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

    // Newsletter subscription
    $('#newsletter-form').submit(function(e) {
        e.preventDefault();
        // Newsletter subscription logic here
        showNotification('Thank you for subscribing!', 'success');
        this.reset();
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
