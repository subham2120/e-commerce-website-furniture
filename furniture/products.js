// Products page specific JavaScript

// Extended product data for products page
const allProducts = [
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
    description: "Ergonomic executive chair with lumbar support",
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
    description: "3-seater modular sofa with premium fabric",
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
    description: "6-seater dining table with matching chairs",
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
    description: "Multi-purpose storage cabinet with shelves",
  },
  {
    id: 5,
    name: "King Size Bed",
    price: 35999,
    originalPrice: 42999,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 203,
    category: "Bedroom",
    badge: "",
    inStock: true,
    description: "Solid wood king size bed with headboard",
  },
  {
    id: 6,
    name: "Coffee Table",
    price: 8999,
    originalPrice: 11999,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    reviews: 67,
    category: "Living Room",
    badge: "Sale",
    inStock: true,
    description: "Modern glass-top coffee table",
  },
  {
    id: 7,
    name: "Bookshelf",
    price: 18999,
    originalPrice: 22999,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    reviews: 134,
    category: "Storage",
    badge: "",
    inStock: true,
    description: "5-tier wooden bookshelf with adjustable shelves",
  },
  {
    id: 8,
    name: "Recliner Chair",
    price: 32999,
    originalPrice: 38999,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 98,
    category: "Living Room",
    badge: "Premium",
    inStock: true,
    description: "Leather recliner chair with massage function",
  },
]

let currentViewMode = "grid"
let filteredProducts = [...allProducts]
let currentFilters = {
  categories: [],
  priceRange: [0, 100000],
  rating: [],
  availability: [],
}

// Helper function to generate star rating
function generateStarRating(rating) {
  let stars = ""
  for (let i = 0; i < Math.floor(rating); i++) {
    stars += '<i class="fas fa-star"></i>'
  }
  if (rating % 1 !== 0) {
    stars += '<i class="fas fa-star-half-alt"></i>'
  }
  return stars
}

// Helper function to format price
function formatPrice(price) {
  return `₹${price.toLocaleString()}`
}

// Initialize products page
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  initializeFilters()
  updateProductCount()
})

// Load and display products
function loadProducts() {
  const container = document.getElementById("products-container")
  if (!container) return

  container.innerHTML = ""

  filteredProducts.forEach((product) => {
    const productElement = createProductElement(product)
    container.appendChild(productElement)
  })
}

// Create product element based on view mode
function createProductElement(product) {
  const col = document.createElement("div")

  if (currentViewMode === "grid") {
    col.className = "col-lg-4 col-md-6 mb-4"
    col.innerHTML = createGridProductCard(product)
  } else {
    col.className = "col-12 mb-3"
    col.innerHTML = createListProductCard(product)
  }

  return col
}

// Create grid view product card
function createGridProductCard(product) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const stars = generateStarRating(product.rating)

  return `
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
                <p class="card-text text-muted small">${product.description}</p>
                <div class="d-flex align-items-center mb-2">
                    <div class="star-rating me-2">${stars}</div>
                    <small class="text-muted">(${product.reviews})</small>
                </div>
                <div class="mb-3">
                    <span class="price-current">${formatPrice(product.price)}</span>
                    <span class="price-original ms-2">${formatPrice(product.originalPrice)}</span>
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
}

// Create list view product card
function createListProductCard(product) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const stars = generateStarRating(product.rating)

  return `
        <div class="card product-card shadow-sm">
            <div class="row g-0">
                <div class="col-md-3">
                    <div class="position-relative">
                        <img src="${product.image}" class="img-fluid h-100 w-100" style="object-fit: cover;" alt="${product.name}">
                        ${product.badge ? `<span class="badge bg-danger product-badge">${product.badge}</span>` : ""}
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card-body d-flex flex-column h-100">
                        <div class="row">
                            <div class="col-md-8">
                                <small class="text-muted">${product.category}</small>
                                <h5 class="card-title fw-bold">${product.name}</h5>
                                <p class="card-text text-muted">${product.description}</p>
                                <div class="d-flex align-items-center mb-2">
                                    <div class="star-rating me-2">${stars}</div>
                                    <small class="text-muted">(${product.reviews} reviews)</small>
                                </div>
                            </div>
                            <div class="col-md-4 text-end">
                                <div class="mb-3">
                                    <div class="price-current">${formatPrice(product.price)}</div>
                                    <div class="price-original">${formatPrice(product.originalPrice)}</div>
                                    <small class="text-success">${discount}% off</small>
                                </div>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-outline-primary btn-sm" onclick="toggleWishlist(${product.id})">
                                        <i class="far fa-heart"></i>
                                    </button>
                                    ${
                                      product.inStock
                                        ? `<button class="btn btn-primary" onclick="addToCart(${product.id})">
                                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                        </button>`
                                        : `<button class="btn btn-secondary" disabled>
                                            Out of Stock
                                        </button>`
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

// Set view mode (grid or list)
function setViewMode(mode) {
  currentViewMode = mode

  // Update button states
  document.getElementById("grid-view").classList.toggle("active", mode === "grid")
  document.getElementById("list-view").classList.toggle("active", mode === "list")

  // Reload products with new view
  loadProducts()
}

// Sort products
function sortProducts() {
  const sortBy = document.getElementById("sortBy").value

  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id)
      break
    default:
      // Featured - restore original order
      filteredProducts = [...allProducts].filter((product) => applyFilters(product))
  }

  loadProducts()
}

// Apply filters to products
function applyFilters(product) {
  // Category filter
  if (currentFilters.categories.length > 0) {
    if (!currentFilters.categories.includes(product.category.toLowerCase().replace(" ", "-"))) {
      return false
    }
  }

  // Price range filter
  if (product.price < currentFilters.priceRange[0] || product.price > currentFilters.priceRange[1]) {
    return false
  }

  // Rating filter
  if (currentFilters.rating.length > 0) {
    const productRating = Math.floor(product.rating)
    if (!currentFilters.rating.some((rating) => productRating >= rating)) {
      return false
    }
  }

  // Availability filter
  if (currentFilters.availability.length > 0) {
    if (currentFilters.availability.includes("in-stock") && !product.inStock) {
      return false
    }
    if (currentFilters.availability.includes("out-of-stock") && product.inStock) {
      return false
    }
  }

  return true
}

// Initialize filter event listeners
function initializeFilters() {
  // Category checkboxes
  const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][value]')
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateFilters()
    })
  })

  // Price range slider
  const priceRange = document.getElementById("priceRange")
  if (priceRange) {
    priceRange.addEventListener("input", () => {
      updatePriceDisplay()
      updateFilters()
    })
  }

  // Min/Max price inputs
  const minPrice = document.getElementById("minPrice")
  const maxPrice = document.getElementById("maxPrice")

  if (minPrice) {
    minPrice.addEventListener("change", function () {
      currentFilters.priceRange[0] = Number.parseInt(this.value) || 0
      updateFilters()
    })
  }

  if (maxPrice) {
    maxPrice.addEventListener("change", function () {
      currentFilters.priceRange[1] = Number.parseInt(this.value) || 100000
      updateFilters()
    })
  }
}

// Update filters and reload products
function updateFilters() {
  // Update category filters
  const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked')
  currentFilters.categories = Array.from(categoryCheckboxes)
    .filter((cb) => ["office", "living", "bedroom", "dining", "storage"].includes(cb.value))
    .map((cb) => cb.value)

  // Update rating filters
  const ratingCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked')
  currentFilters.rating = Array.from(ratingCheckboxes)
    .filter((cb) => ["3", "4", "5"].includes(cb.value))
    .map((cb) => Number.parseInt(cb.value))

  // Update availability filters
  const availabilityCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked')
  currentFilters.availability = Array.from(availabilityCheckboxes)
    .filter((cb) => ["in-stock", "out-of-stock"].includes(cb.value))
    .map((cb) => cb.value)

  // Update price range from slider
  const priceRange = document.getElementById("priceRange")
  if (priceRange) {
    currentFilters.priceRange[1] = Number.parseInt(priceRange.value)
  }

  // Apply filters
  filteredProducts = allProducts.filter((product) => applyFilters(product))

  // Reload products and update count
  loadProducts()
  updateProductCount()
}

// Update price display
function updatePriceDisplay() {
  const priceRange = document.getElementById("priceRange")
  const label = document.querySelector('label[for="priceRange"]')

  if (priceRange && label) {
    label.textContent = `₹0 - ₹${Number.parseInt(priceRange.value).toLocaleString()}`
  }
}

// Update product count display
function updateProductCount() {
  const countElement = document.getElementById("product-count")
  if (countElement) {
    countElement.textContent = filteredProducts.length
  }
}

// Clear all filters
function clearFilters() {
  // Reset checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false
  })

  // Reset price range
  const priceRange = document.getElementById("priceRange")
  if (priceRange) {
    priceRange.value = 100000
    updatePriceDisplay()
  }

  // Reset price inputs
  const minPrice = document.getElementById("minPrice")
  const maxPrice = document.getElementById("maxPrice")
  if (minPrice) minPrice.value = ""
  if (maxPrice) maxPrice.value = ""

  // Reset filters object
  currentFilters = {
    categories: [],
    priceRange: [0, 100000],
    rating: [],
    availability: [],
  }

  // Reset products
  filteredProducts = [...allProducts]
  loadProducts()
  updateProductCount()
}

// Search functionality
function performSearch() {
  const searchInput = document.getElementById("search-input")
  const query = searchInput.value.toLowerCase().trim()

  if (query) {
    filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    )
  } else {
    filteredProducts = [...allProducts]
  }

  loadProducts()
  updateProductCount()
}

// Handle search on Enter key
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  }
})
