// Shopping Cart JavaScript

// Sample cart data (in Laravel, this would come from session/database)
let cartItems = [
  {
    id: 1,
    name: "Executive Office Chair",
    price: 15999,
    originalPrice: 19999,
    image:
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quantity: 1,
    category: "Office Furniture",
  },
  {
    id: 2,
    name: "Modular Sofa Set",
    price: 45999,
    originalPrice: 55999,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quantity: 1,
    category: "Living Room",
  },
  {
    id: 3,
    name: "Storage Cabinet",
    price: 12999,
    originalPrice: 15999,
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quantity: 2,
    category: "Storage",
  },
]

let promoApplied = false
let promoDiscount = 0

// Initialize cart page
document.addEventListener("DOMContentLoaded", () => {
  loadCartItems()
  updateCartSummary()
})

// Load cart items
function loadCartItems() {
  const container = document.getElementById("cart-items")
  const cartCount = document.getElementById("cart-count")

  if (cartItems.length === 0) {
    container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fs-1 text-muted mb-3"></i>
                <h4>Your cart is empty</h4>
                <p class="text-muted">Start shopping to add items to your cart</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `
    cartCount.textContent = "0"
    return
  }

  container.innerHTML = ""
  cartCount.textContent = cartItems.length

  cartItems.forEach((item, index) => {
    const cartItem = createCartItemElement(item, index)
    container.appendChild(cartItem)
  })
}

// Create cart item element
function createCartItemElement(item, index) {
  const div = document.createElement("div")
  div.className = "border-bottom pb-3 mb-3"

  const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)

  div.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-2">
                <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-4">
                <h6 class="fw-bold mb-1">${item.name}</h6>
                <small class="text-muted">${item.category}</small>
                <div class="mt-2">
                    <span class="text-success fw-bold">₹${item.price.toLocaleString()}</span>
                    <span class="text-muted text-decoration-line-through ms-2">₹${item.originalPrice.toLocaleString()}</span>
                    <small class="text-success ms-2">${discount}% off</small>
                </div>
            </div>
            <div class="col-md-3">
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="mx-3 fw-bold">${item.quantity}</span>
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-2 text-end">
                <div class="fw-bold">₹${(item.price * item.quantity).toLocaleString()}</div>
            </div>
            <div class="col-md-1 text-end">
                <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `

  return div
}

// Update item quantity
function updateQuantity(index, newQuantity) {
  if (newQuantity < 1) {
    removeItem(index)
    return
  }

  cartItems[index].quantity = newQuantity
  loadCartItems()
  updateCartSummary()
  showNotification("Quantity updated", "success")
}

// Remove item from cart
function removeItem(index) {
  const itemName = cartItems[index].name
  cartItems.splice(index, 1)
  loadCartItems()
  updateCartSummary()
  showNotification(`${itemName} removed from cart`, "info")
}

// Update cart summary
function updateCartSummary() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
  const shipping = subtotal >= 25000 ? 0 : 999
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal - discount + shipping

  document.getElementById("subtotal").textContent = `₹${subtotal.toLocaleString()}`
  document.getElementById("savings").textContent = `₹${savings.toLocaleString()}`
  document.getElementById("shipping").textContent = shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`
  document.getElementById("total").textContent = `₹${total.toLocaleString()}`

  // Update cart badge
  const cartBadge = document.getElementById("cart-badge")
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  cartBadge.textContent = totalItems

  // Update free shipping notice
  const shippingNotice = document.getElementById("shipping-notice")
  const freeShippingAmount = document.getElementById("free-shipping-amount")

  if (subtotal >= 25000) {
    shippingNotice.classList.add("d-none")
  } else {
    shippingNotice.classList.remove("d-none")
    freeShippingAmount.textContent = (25000 - subtotal).toLocaleString()
  }
}

// Apply promo code
function applyPromoCode() {
  const promoCode = document.getElementById("promo-code").value.trim().toLowerCase()

  if (promoCode === "save10" && !promoApplied) {
    promoApplied = true
    promoDiscount = 0.1
    updateCartSummary()
    showNotification("Promo code applied! 10% discount added", "success")

    // Disable promo code input
    document.getElementById("promo-code").disabled = true
    document.querySelector('button[onclick="applyPromoCode()"]').textContent = "Applied"
    document.querySelector('button[onclick="applyPromoCode()"]').disabled = true
  } else if (promoApplied) {
    showNotification("Promo code already applied", "warning")
  } else {
    showNotification("Invalid promo code", "danger")
  }
}

// Proceed to checkout
function proceedToCheckout() {
  if (cartItems.length === 0) {
    showNotification("Your cart is empty", "warning")
    return
  }

  // In Laravel, this would redirect to checkout page
  showNotification("Redirecting to checkout...", "info")

  // Simulate checkout process
  setTimeout(() => {
    alert("Checkout functionality would be implemented here with payment gateway integration")
  }, 1500)
}

// Show notification
function showNotification(message, type) {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(alertDiv)

  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove()
    }
  }, 3000)
}

// Save cart to localStorage (in Laravel, this would be handled by sessions)
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems))
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
  }
}

// Initialize cart from localStorage
loadCart()
