// Product data
const products = [
  {
    id: 1,
    name: "Classic Cola Fizz",
    price: 2.99,
    originalPrice: 3.49,
    image: "https://via.placeholder.com/250x250/8B4513/FFFFFF?text=Cola+Fizz",
    rating: 4.5,
    reviews: 128,
    discount: "15% OFF",
    category: "cola",
    description: "The classic cola taste with a perfect fizz",
    ingredients: ["Carbonated Water", "Natural Cola Extract", "Cane Sugar", "Citric Acid", "Natural Flavors"],
    nutrition: {
      calories: 140,
      sugar: "35g",
      sodium: "45mg",
      caffeine: "34mg",
    },
  },
  {
    id: 2,
    name: "Tropical Burst",
    price: 3.29,
    originalPrice: 3.79,
    image: "https://via.placeholder.com/250x250/FF6B35/FFFFFF?text=Tropical+Burst",
    rating: 4.8,
    reviews: 95,
    discount: "13% OFF",
    category: "fruit",
    description: "Exotic tropical fruits in every sip",
    ingredients: ["Carbonated Water", "Mango Juice", "Pineapple Juice", "Passion Fruit Extract", "Cane Sugar"],
    nutrition: {
      calories: 120,
      sugar: "30g",
      sodium: "25mg",
      caffeine: "0mg",
    },
  },
  {
    id: 3,
    name: "Berry Blast",
    price: 3.19,
    originalPrice: 3.69,
    image: "https://via.placeholder.com/250x250/8E44AD/FFFFFF?text=Berry+Blast",
    rating: 4.6,
    reviews: 87,
    discount: "14% OFF",
    category: "berry",
    description: "Mixed berries with a refreshing twist",
    ingredients: ["Carbonated Water", "Strawberry Juice", "Blueberry Extract", "Raspberry Juice", "Natural Sweeteners"],
    nutrition: {
      calories: 110,
      sugar: "28g",
      sodium: "20mg",
      caffeine: "0mg",
    },
  },
  {
    id: 4,
    name: "Lemon Lime Zing",
    price: 2.89,
    originalPrice: 3.29,
    image: "https://via.placeholder.com/250x250/F1C40F/000000?text=Lemon+Lime",
    rating: 4.4,
    reviews: 156,
    discount: "12% OFF",
    category: "citrus",
    description: "Zesty lemon and lime combination",
    ingredients: ["Carbonated Water", "Lemon Juice", "Lime Juice", "Cane Sugar", "Natural Citrus Oils"],
    nutrition: {
      calories: 100,
      sugar: "25g",
      sodium: "30mg",
      caffeine: "0mg",
    },
  },
  {
    id: 5,
    name: "Orange Crush",
    price: 3.09,
    originalPrice: 3.59,
    image: "https://via.placeholder.com/250x250/E67E22/FFFFFF?text=Orange+Crush",
    rating: 4.7,
    reviews: 203,
    discount: "14% OFF",
    category: "citrus",
    description: "Fresh orange flavor with natural sweetness",
    ingredients: ["Carbonated Water", "Orange Juice Concentrate", "Natural Orange Flavor", "Cane Sugar", "Vitamin C"],
    nutrition: {
      calories: 130,
      sugar: "32g",
      sodium: "35mg",
      caffeine: "0mg",
    },
  },
  {
    id: 6,
    name: "Grape Explosion",
    price: 3.39,
    originalPrice: 3.89,
    image: "https://via.placeholder.com/250x250/9B59B6/FFFFFF?text=Grape+Explosion",
    rating: 4.3,
    reviews: 74,
    discount: "13% OFF",
    category: "fruit",
    description: "Rich grape flavor with intense fizz",
    ingredients: ["Carbonated Water", "Concord Grape Juice", "Natural Grape Flavor", "Cane Sugar", "Tartaric Acid"],
    nutrition: {
      calories: 135,
      sugar: "34g",
      sodium: "40mg",
      caffeine: "0mg",
    },
  },
]

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    productId: 1,
    name: "Sarah M.",
    rating: 5,
    title: "Perfect Cola Taste!",
    review:
      "This is exactly what I was looking for! The cola flavor is authentic and not too sweet. The fizz level is perfect - not too aggressive but enough to give that satisfying carbonation. Will definitely order again!",
    date: "2024-01-15",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    name: "Mike R.",
    rating: 4,
    title: "Great alternative to mainstream colas",
    review:
      "Really enjoyed this drink. The natural ingredients make a difference - you can taste the quality. Only reason it's not 5 stars is the price point, but worth it for the quality.",
    date: "2024-01-10",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    productId: 2,
    name: "Jessica L.",
    rating: 5,
    title: "Tropical Paradise in a Bottle!",
    review:
      "OMG! This drink tastes like vacation in a bottle. The mango and pineapple flavors are so authentic and refreshing. Perfect for summer days. My new favorite!",
    date: "2024-01-12",
    helpful: 15,
    verified: true,
  },
]

// Global variables
let cart = JSON.parse(localStorage.getItem("cart")) || []
let reviews = JSON.parse(localStorage.getItem("reviews")) || sampleReviews
let filteredProducts = [...products]
let currentProductId = null
let currentRating = 0
let discount = 0

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  setupEventListeners()
  renderProducts()
  updateCartCount()
  setupMobileMenu()
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href").substring(1)
      scrollToSection(target)
    })
  })

  // Cart link
  document.querySelector(".cart-link").addEventListener("click", (e) => {
    e.preventDefault()
    openCartModal()
  })

  // Search and filters
  document.getElementById("search").addEventListener("input", filterProducts)
  document.getElementById("category-filter").addEventListener("change", filterProducts)
  document.getElementById("sort-filter").addEventListener("change", filterProducts)

  // Contact form
  document.getElementById("contact-form").addEventListener("submit", handleContactForm)

  // Checkout form
  document.getElementById("checkout-form").addEventListener("submit", handleCheckout)

  // Review form
  document.getElementById("review-form").addEventListener("submit", handleReviewSubmission)

  // Modal close buttons
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      this.closest(".modal").style.display = "none"
    })
  })

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none"
    }
  })

  // Star rating
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      currentRating = Number.parseInt(this.dataset.rating)
      updateStarRating()
    })

    star.addEventListener("mouseover", function () {
      const rating = Number.parseInt(this.dataset.rating)
      highlightStars(rating)
    })
  })

  document.getElementById("star-rating").addEventListener("mouseleave", () => {
    highlightStars(currentRating)
  })
}

function setupMobileMenu() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 70 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

function renderProducts() {
  const productsGrid = document.getElementById("products-grid")
  productsGrid.innerHTML = ""

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })
}

function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"

  const stars = generateStars(product.rating)

  card.innerHTML = `
        <div style="position: relative;">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="discount-badge-product">${product.discount}</div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">
                <div class="stars">${stars}</div>
                <span class="rating-text">(${product.reviews} reviews)</span>
            </div>
            <div class="product-price">
                <span class="current-price">$${product.price}</span>
                <span class="original-price">$${product.originalPrice}</span>
                <span class="category-badge">${product.category}</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-outline" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
                <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">View Details</button>
            </div>
        </div>
    `

  return card
}

function generateStars(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += "★"
    } else if (i - 0.5 <= rating) {
      stars += "☆"
    } else {
      stars += "☆"
    }
  }
  return stars
}

function filterProducts() {
  const searchTerm = document.getElementById("search").value.toLowerCase()
  const categoryFilter = document.getElementById("category-filter").value
  const sortFilter = document.getElementById("sort-filter").value

  // Filter products
  filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortFilter) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return a.name.localeCompare(b.name)
    }
  })

  renderProducts()
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()

  // Show feedback
  showNotification(`${product.name} added to cart!`)
}

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  document.getElementById("cart-count").textContent = cartCount
}

function openCartModal() {
  renderCartItems()
  updateCartTotals()
  document.getElementById("cart-modal").style.display = "block"
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  cartItemsContainer.innerHTML = ""

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align: center; color: #6B7280; padding: 40px;">Your cart is empty</p>'
    return
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price} each</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `
    cartItemsContainer.appendChild(cartItem)
  })
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId)
    return
  }

  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity = newQuantity
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCartItems()
    updateCartTotals()
    updateCartCount()
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  renderCartItems()
  updateCartTotals()
  updateCartCount()
}

function updateCartTotals() {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount

  document.getElementById("cart-subtotal").textContent = subtotal.toFixed(2)
  document.getElementById("cart-total").textContent = total.toFixed(2)

  if (discount > 0) {
    document.getElementById("discount-amount").textContent = discountAmount.toFixed(2)
    document.getElementById("discount-row").style.display = "flex"
  } else {
    document.getElementById("discount-row").style.display = "none"
  }
}

function applyPromoCode() {
  const promoCode = document.getElementById("promo-code").value.toLowerCase()

  if (promoCode === "fizz20") {
    discount = 0.2
    showNotification("Promo code applied! 20% discount")
  } else if (promoCode === "welcome10") {
    discount = 0.1
    showNotification("Promo code applied! 10% discount")
  } else {
    discount = 0
    showNotification("Invalid promo code", "error")
  }

  updateCartTotals()
}

function proceedToCheckout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty", "error")
    return
  }

  document.getElementById("cart-modal").style.display = "none"
  document.getElementById("checkout-modal").style.display = "block"
}

function viewProductDetails(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  currentProductId = productId

  const modalContent = document.getElementById("product-detail-content")
  const stars = generateStars(product.rating)

  modalContent.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <p style="margin: 15px 0; color: #6B7280;">${product.description}</p>
                <div class="product-price" style="margin: 20px 0;">
                    <span class="current-price">$${product.price}</span>
                    <span class="original-price">$${product.originalPrice}</span>
                </div>
                <div style="display: flex; gap: 10px; margin: 20px 0;">
                    <button class="btn btn-outline" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); showNotification('Added to cart!')">Buy Now</button>
                </div>
            </div>
        </div>
        
        <div class="product-tabs">
            <div class="tab-buttons">
                <button class="tab-btn active" onclick="showTab('description')">Description</button>
                <button class="tab-btn" onclick="showTab('ingredients')">Ingredients</button>
                <button class="tab-btn" onclick="showTab('nutrition')">Nutrition</button>
                <button class="tab-btn" onclick="showTab('reviews')">Reviews</button>
            </div>
            
            <div id="description-tab" class="tab-content active">
                <h4>Product Description</h4>
                <p>${product.description}</p>
            </div>
            
            <div id="ingredients-tab" class="tab-content">
                <h4>Ingredients</h4>
                <ul class="ingredients-list">
                    ${product.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
                </ul>
            </div>
            
            <div id="nutrition-tab" class="tab-content">
                <h4>Nutrition Facts</h4>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <span>Calories:</span>
                        <strong>${product.nutrition.calories}</strong>
                    </div>
                    <div class="nutrition-item">
                        <span>Sugar:</span>
                        <strong>${product.nutrition.sugar}</strong>
                    </div>
                    <div class="nutrition-item">
                        <span>Sodium:</span>
                        <strong>${product.nutrition.sodium}</strong>
                    </div>
                    <div class="nutrition-item">
                        <span>Caffeine:</span>
                        <strong>${product.nutrition.caffeine}</strong>
                    </div>
                </div>
            </div>
            
            <div id="reviews-tab" class="tab-content">
                <div class="reviews-section">
                    <div class="review-header">
                        <h4>Customer Reviews</h4>
                        <button class="write-review-btn" onclick="openReviewModal()">Write a Review</button>
                    </div>
                    <div id="reviews-list">
                        ${renderProductReviews(productId)}
                    </div>
                </div>
            </div>
        </div>
    `

  document.getElementById("product-modal-title").textContent = product.name
  document.getElementById("product-modal").style.display = "block"
}

function showTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab content
  document.getElementById(tabName + "-tab").classList.add("active")

  // Add active class to clicked button
  event.target.classList.add("active")
}

function renderProductReviews(productId) {
  const productReviews = reviews.filter((review) => review.productId === productId)

  if (productReviews.length === 0) {
    return '<p style="text-align: center; color: #6B7280; padding: 40px;">No reviews yet. Be the first to review this product!</p>'
  }

  return productReviews
    .map((review) => {
      const stars = generateStars(review.rating)
      const reviewDate = new Date(review.date).toLocaleDateString()

      return `
            <div class="review-item">
                <div class="review-header-info">
                    <div>
                        <span class="reviewer-name">${review.name}</span>
                        ${review.verified ? '<span style="background: #E5E7EB; color: #374151; padding: 2px 6px; border-radius: 10px; font-size: 12px; margin-left: 10px;">Verified Purchase</span>' : ""}
                    </div>
                    <span class="review-date">${reviewDate}</span>
                </div>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                </div>
                <div class="review-title">${review.title}</div>
                <div class="review-text">${review.review}</div>
                <div class="review-helpful">
                    <span>Was this helpful?</span>
                    <button class="helpful-btn" onclick="markHelpful(${review.id}, true)">
                        👍 Yes (${review.helpful})
                    </button>
                    <button class="helpful-btn" onclick="markHelpful(${review.id}, false)">
                        👎 No
                    </button>
                </div>
            </div>
        `
    })
    .join("")
}

function openReviewModal() {
  document.getElementById("product-modal").style.display = "none"
  document.getElementById("review-modal").style.display = "block"
  currentRating = 0
  updateStarRating()
}

function updateStarRating() {
  highlightStars(currentRating)
}

function highlightStars(rating) {
  document.querySelectorAll(".star").forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active")
    } else {
      star.classList.remove("active")
    }
  })
}

function markHelpful(reviewId, isHelpful) {
  const review = reviews.find((r) => r.id === reviewId)
  if (review && isHelpful) {
    review.helpful += 1
    localStorage.setItem("reviews", JSON.stringify(reviews))

    // Refresh the reviews display
    if (currentProductId) {
      const reviewsList = document.getElementById("reviews-list")
      if (reviewsList) {
        reviewsList.innerHTML = renderProductReviews(currentProductId)
      }
    }

    showNotification("Thank you for your feedback!")
  }
}

function handleContactForm(e) {
  e.preventDefault()

  const formData = {
    name: document.getElementById("contact-name").value,
    email: document.getElementById("contact-email").value,
    subject: document.getElementById("contact-subject").value,
    message: document.getElementById("contact-message").value,
  }

  // Simulate form submission
  showNotification("Thank you for your message! We'll get back to you soon.")

  // Reset form
  document.getElementById("contact-form").reset()
}

function handleCheckout(e) {
  e.preventDefault()

  const formData = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zip: document.getElementById("zip").value,
    cardNumber: document.getElementById("card-number").value,
    expiry: document.getElementById("expiry").value,
    cvv: document.getElementById("cvv").value,
    cardName: document.getElementById("card-name").value,
  }

  // Validate required fields
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "zip",
    "cardNumber",
    "expiry",
    "cvv",
    "cardName",
  ]
  const missingFields = requiredFields.filter((field) => !formData[field])

  if (missingFields.length > 0) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  // Simulate order processing
  showNotification("Order placed successfully! Thank you for your purchase.")

  // Clear cart and close modal
  cart = []
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  document.getElementById("checkout-modal").style.display = "none"
  document.getElementById("checkout-form").reset()
}

function handleReviewSubmission(e) {
  e.preventDefault()

  if (currentRating === 0) {
    showNotification("Please select a rating", "error")
    return
  }

  const reviewData = {
    id: Date.now(),
    productId: currentProductId,
    name: document.getElementById("reviewer-name").value,
    email: document.getElementById("reviewer-email").value,
    rating: currentRating,
    title: document.getElementById("review-title").value,
    review: document.getElementById("review-text").value,
    date: new Date().toISOString(),
    helpful: 0,
    verified: false,
  }

  // Add review to reviews array
  reviews.push(reviewData)
  localStorage.setItem("reviews", JSON.stringify(reviews))

  showNotification("Thank you for your review! It will be published after moderation.")

  // Reset form and close modal
  document.getElementById("review-form").reset()
  document.getElementById("review-modal").style.display = "none"
  currentRating = 0

  // Refresh product modal if open
  if (currentProductId) {
    viewProductDetails(currentProductId)
  }
}

function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "error" ? "#EF4444" : "#059669"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: bold;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `
  notification.textContent = message

  // Add animation keyframes if not already added
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Initialize cart from localStorage on page load
function initializeCart() {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCartCount()
  }
}

// Initialize reviews from localStorage on page load
function initializeReviews() {
  const savedReviews = localStorage.getItem("reviews")
  if (savedReviews) {
    reviews = JSON.parse(savedReviews)
  } else {
    localStorage.setItem("reviews", JSON.stringify(sampleReviews))
  }
}

// Call initialization functions
initializeCart()
initializeReviews()

// Add scroll effect for navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "#fff"
    navbar.style.backdropFilter = "none"
  }
})

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".feature-card, .product-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
    observer.observe(el)
  })
})
