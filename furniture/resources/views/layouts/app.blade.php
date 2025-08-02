<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'FurniStore - Premium Furniture for Home & Office')</title>
    <meta name="description" content="@yield('description', 'Discover our exclusive collection of modern, comfortable, and stylish furniture for every room in your home and office.')">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    
    @stack('styles')
</head>
<body>
    <!-- Top Bar -->
    <div class="bg-dark text-white py-2">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <small>
                        <i class="fas fa-phone me-2"></i>+91 1800-123-4567
                        <i class="fas fa-envelope ms-3 me-2"></i>support@furnistore.com
                    </small>
                </div>
                <div class="col-md-6 text-end">
                    <small>
                        <a href="#" class="text-white text-decoration-none me-3">Track Order</a>
                        <a href="#" class="text-white text-decoration-none">Help</a>
                    </small>
                </div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="bg-white border-bottom sticky-top">
        <div class="container py-3">
            <div class="row align-items-center">
                <!-- Logo -->
                <div class="col-md-3">
                    <a href="{{ route('home') }}" class="text-decoration-none">
                        <h2 class="text-primary mb-0 fw-bold">FurniStore</h2>
                    </a>
                </div>

                <!-- Search Bar -->
                <div class="col-md-6">
                    <form action="{{ route('products.index') }}" method="GET">
                        <div class="input-group">
                            <input type="text" name="search" class="form-control" 
                                   placeholder="Search for furniture, decor, and more..." 
                                   value="{{ request('search') }}">
                            <button class="btn btn-primary" type="submit">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Right Actions -->
                <div class="col-md-3 text-end">
                    <div class="d-inline-flex align-items-center gap-3">
                        <!-- Wishlist -->
                        <div class="position-relative">
                            <i class="fas fa-heart fs-5 text-muted"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {{ auth()->check() ? auth()->user()->wishlist()->count() : 0 }}
                            </span>
                        </div>

                        <!-- Cart -->
                        <div class="position-relative">
                            <a href="{{ route('cart.index') }}" class="text-decoration-none text-muted">
                                <i class="fas fa-shopping-cart fs-5"></i>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-badge">
                                    {{ auth()->check() ? auth()->user()->cart_items_count : 0 }}
                                </span>
                            </a>
                        </div>

                        <!-- User Menu -->
                        <div class="dropdown">
                            <button class="btn btn-link text-muted p-0" type="button" data-bs-toggle="dropdown">
                                <i class="fas fa-user fs-5"></i>
                            </button>
                            <ul class="dropdown-menu">
                                @guest
                                    <li><a class="dropdown-item" href="{{ route('login') }}">Login</a></li>
                                    <li><a class="dropdown-item" href="{{ route('register') }}">Register</a></li>
                                @else
                                    <li><a class="dropdown-item" href="{{ route('profile') }}">My Account</a></li>
                                    <li><a class="dropdown-item" href="{{ route('orders.index') }}">My Orders</a></li>
                                    @if(auth()->user()->isAdmin())
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="{{ route('admin.dashboard') }}">Admin Panel</a></li>
                                    @endif
                                    <li><hr class="dropdown-divider"></li>
                                    <li>
                                        <a class="dropdown-item" href="{{ route('logout') }}"
                                           onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                            @csrf
                                        </form>
                                    </li>
                                @endguest
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="bg-light border-top">
            <div class="container">
                <div class="row align-items-center py-2">
                    <div class="col-md-8">
                        <div class="d-flex align-items-center gap-4">
                            <div class="dropdown">
                                <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    All Categories
                                </button>
                                <ul class="dropdown-menu">
                                    @foreach(\App\Models\Category::active()->parent()->get() as $category)
                                        <li>
                                            <a class="dropdown-item" href="{{ route('products.index', ['category' => $category->slug]) }}">
                                                {{ $category->name }}
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                            <a href="{{ route('products.index') }}" class="text-decoration-none text-dark fw-medium">Products</a>
                            <a href="#" class="text-decoration-none text-dark fw-medium">Deals</a>
                            <a href="#" class="text-decoration-none text-dark fw-medium">New Arrivals</a>
                            <a href="#" class="text-decoration-none text-dark fw-medium">About</a>
                            <a href="#" class="text-decoration-none text-dark fw-medium">Contact</a>
                        </div>
                    </div>
                    <div class="col-md-4 text-end">
                        <small class="text-muted">Free shipping on orders over ₹25,000</small>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main>
        @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif

        @if(session('error'))
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {{ session('error') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif

        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-primary mb-3">FurniStore</h5>
                    <p class="text-light">Your trusted partner for premium furniture solutions. We bring comfort, style, and quality to your home and office.</p>
                    <div class="d-flex gap-3">
                        <a href="#" class="text-light"><i class="fab fa-facebook fs-5"></i></a>
                        <a href="#" class="text-light"><i class="fab fa-twitter fs-5"></i></a>
                        <a href="#" class="text-light"><i class="fab fa-instagram fs-5"></i></a>
                        <a href="#" class="text-light"><i class="fab fa-youtube fs-5"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h6 class="mb-3">Quick Links</h6>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-light text-decoration-none">About Us</a></li>
                        <li><a href="{{ route('products.index') }}" class="text-light text-decoration-none">Products</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Deals & Offers</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Blog</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Careers</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h6 class="mb-3">Customer Service</h6>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-light text-decoration-none">Contact Us</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Shipping Info</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Returns & Exchanges</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Warranty</a></li>
                        <li><a href="#" class="text-light text-decoration-none">FAQ</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h6 class="mb-3">Contact Info</h6>
                    <div class="d-flex align-items-center mb-2">
                        <i class="fas fa-map-marker-alt me-3"></i>
                        <span>123 Furniture Street, Mumbai, India</span>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                        <i class="fas fa-phone me-3"></i>
                        <span>+91 1800-123-4567</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="fas fa-envelope me-3"></i>
                        <span>support@furnistore.com</span>
                    </div>
                </div>
            </div>
            <hr class="my-4">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="mb-0">&copy; {{ date('Y') }} FurniStore. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-end">
                    <a href="#" class="text-light text-decoration-none me-3">Privacy Policy</a>
                    <a href="#" class="text-light text-decoration-none me-3">Terms of Service</a>
                    <a href="#" class="text-light text-decoration-none">Cookie Policy</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    
    @stack('scripts')
</body>
</html>
