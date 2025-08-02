// FurniStore JavaScript Functions

// Sample product data (in Laravel, this would come from your database)
const featuredProducts = [
  {
    id: 1,
    name: "Executive Office Chair",
    price: 15999,
    originalPrice: 19999,
    image:
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    reviews: 128,
    category: "Office Furniture",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    name: "Modular Sofa Set",
    price: 45999,
    originalPrice: 55999,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 89,
    category: "Living Room",
    badge: "New Arrival",
    inStock: true,
  },
  {
    id: 3,
    name: "Dining Table Set",
    price: 28999,
    originalPrice: 34999,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 156,
    category: "Dining Room",
    badge: "Sale",
    inStock: true,
  },
  {
    id: 4,
    name: "Storage Cabinet",
    price: 12999,
    originalPrice: 15999,
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    reviews: 92,
    category: "Storage",
    badge: "",
    inStock: false,
  },
]

// Shopping cart functionality
const cart = JSON.parse(localStorage.getItem("cart")) || []

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedProducts()
  updateCartBadge()
  initializeEventListeners()
})

// Load featured products
function loadFeaturedProducts() {
  const container = document.getElementById("featured-products")
  if (!container) return

  container.innerHTML = ""

  featuredProducts.forEach((product) => {
    const productCard = createProductCard(product)
    container.appendChild(productCard)
  })
}

// Create product card HTML
function createProductCard(product) {
  const col = document.createElement("div")
  col.className = "col-lg-3 col-md-6 mb-4"

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const stars = generateStarRating(product.rating)

  col.innerHTML = `
        <div class="card product-card h-100 shadow-sm">
            <div class="position-relative">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                ${product.badge ? `<span class="badge bg-danger product-badge">${product.badge}</span>` : ""}
                <div class="product-actions">
                    <button class="btn btn-light btn-sm rounded-circle me-2" onclick="toggleWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="card-body d-flex flex-column">
                <small class="text-muted">${product.category}</small>
                <h6 class="card-title fw-bold">${product.name}</h6>
                <div class="d-flex align-items-center mb-2">
                    <div class="star-rating me-2">${stars}</div>
                    <small class="text-muted">(${product.reviews})</small>
                </div>
                <div class="mb-3">
                    <span class="price-current">₹${product.price.toLocaleString()}</span>
                    <span class="price-original ms-2">₹${product.originalPrice.toLocaleString()}</span>
                    <small class="text-success ms-2">${discount}% off</small>
                </div>
                <div class="mt-auto">
                    ${
                      product.inStock
                        ? `<button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>`
                        : `<button class="btn btn-secondary w-100" disabled>
                            Out of Stock
                        </button>`
                    }
                </div>
            </div>
        </div>
    `

  return col
}

// Generate star rating HTML
function generateStarRating(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>'
    } else if (i - 0.5 <= rating) {
      stars += '<i class="fas fa-star-half-alt"></i>'
    } else {
      stars += '<i class="far fa-star"></i>'
    }
  }
  return stars
}

// Add to cart functionality
function addToCart(productId) {
  const product = featuredProducts.find((p) => p.id === productId)
  if (!product || !product.inStock) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartBadge()
  showNotification("Product added to cart!", "success")
}

// Update cart badge
function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-badge, .badge")
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  badges.forEach((badge) => {
    if (badge.closest(".fa-shopping-cart")) {
      badge.textContent = totalItems
      badge.style.display = totalItems > 0 ? "block" : "none"
    }
  })
}

// Toggle wishlist
function toggleWishlist(productId) {
  // In Laravel, this would make an AJAX call to your backend
  showNotification("Added to wishlist!", "info")
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(notification)

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 3000)
}

// Initialize event listeners
function initializeEventListeners() {
  // Search functionality
  const searchInput = document.querySelector('input[type="text"]')
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value)
      }
    })
  }

  // Newsletter subscription
  const newsletterForm = document.querySelector(".input-group")
  if (newsletterForm) {
    const subscribeBtn = newsletterForm.querySelector("button")
    const emailInput = newsletterForm.querySelector('input[type="email"]')

    subscribeBtn.addEventListener("click", () => {
      const email = emailInput.value
      if (validateEmail(email)) {
        subscribeToNewsletter(email)
      } else {
        showNotification("Please enter a valid email address", "warning")
      }
    })
  }

  // Category card clicks
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const categoryName = this.querySelector("h6").textContent
      window.location.href = `products.html?category=${encodeURIComponent(categoryName.toLowerCase())}`
    })
  })
}

// Search functionality
function performSearch(query) {
  if (query.trim()) {
    window.location.href = `products.html?search=${encodeURIComponent(query)}`
  }
}

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Newsletter subscription
function subscribeToNewsletter(email) {
  // In Laravel, this would make an AJAX call to your backend
  // For now, we'll just show a success message
  showNotification("Successfully subscribed to newsletter!", "success")

  // Clear the input
  const emailInput = document.querySelector('input[type="email"]')
  if (emailInput) {
    emailInput.value = ""
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  lazyLoadImages()
}

// Handle responsive navigation
function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu")
  if (mobileMenu) {
    mobileMenu.classList.toggle("show")
  }
}

// Price formatting utility
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price)
}

// Debounce utility for search
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Export functions for use in other files
window.FurniStore = {
  addToCart,
  toggleWishlist,
  updateCartBadge,
  showNotification,
  formatPrice,
  debounce,
}
