document.addEventListener("DOMContentLoaded", function () {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro Max 128GB",
      price: 27990000,
      originalPrice: 29990000,
      image: "ip14.png",
      category: "electronics",
      rating: 4.8,
      ratingCount: 125,
      description:
        "iPhone 14 Pro Max 128GB - Màn hình Super Retina XDR 6.7 inch, chip A16 Bionic mạnh mẽ, camera chính 48MP, pin trâu, hỗ trợ 5G.",
    },
    {
      id: 2,
      name: "MacBook Air M1 2020 13.3 inch",
      price: 19990000,
      originalPrice: 22990000,
      image: "mb.png",
      category: "electronics",
      rating: 4.9,
      ratingCount: 89,
      description:
        "MacBook Air M1 2020 13.3 inch - Chip Apple M1 8-core, RAM 8GB, SSD 256GB, màn hình Retina, thời lượng pin lên đến 18 giờ.",
    },
    {
      id: 3,
      name: "Áo thun nam cổ tròn basic",
      price: 149000,
      originalPrice: 199000,
      image: "ao.png",
      category: "fashion",
      rating: 4.5,
      ratingCount: 256,
      description:
        "Áo thun nam cổ tròn basic - Chất liệu cotton 100% thoáng mát, co giãn tốt, kiểu dáng đơn giản dễ phối đồ.",
    },
    {
      id: 4,
      name: "Quần jeans nam slim fit",
      price: 349000,
      originalPrice: 499000,
      image: "quan.png",
      category: "fashion",
      rating: 4.6,
      ratingCount: 187,
      description:
        "Quần jeans nam slim fit - Chất liệu denim co giãn, kiểu dáng ôm vừa phải, nhiều size từ 28 đến 36.",
    },
    {
      id: 5,
      name: "Nồi chiên không dầu 5.5L",
      price: 1299000,
      originalPrice: 1599000,
      image: "noi.png",
      category: "home",
      rating: 4.7,
      ratingCount: 342,
      description:
        "Nồi chiên không dầu 5.5L - Công suất 1500W, dung tích 5.5L, 11 chế độ nấu, công nghệ Rapid Air giúp chiên giòn với ít dầu.",
    },
    {
      id: 6,
      name: "Máy xay sinh tố đa năng",
      price: 599000,
      originalPrice: 799000,
      image: "mayxay.png",
      category: "home",
      rating: 4.4,
      ratingCount: 156,
      description:
        "Máy xay sinh tố đa năng - Công suất 1000W, 2 cối xay (thủy tinh + nhựa), lưỡi dao inox, xay nhuyễn mọi thực phẩm.",
    },
    {
      id: 7,
      name: "Tai nghe Bluetooth Sony WH-1000XM4",
      price: 5490000,
      originalPrice: 6990000,
      image: "tainghe.png",
      category: "electronics",
      rating: 4.9,
      ratingCount: 210,
      description:
        "Tai nghe Bluetooth Sony WH-1000XM4 - Chống ồn chủ động, thời lượng pin 30 giờ, âm thanh chất lượng cao, tích hợp trợ lý ảo.",
    },
    {
      id: 8,
      name: "Giày thể thao nam đế êm",
      price: 499000,
      originalPrice: 699000,
      image: "giay.png",
      category: "fashion",
      rating: 4.7,
      ratingCount: 178,
      description:
        "Giày thể thao nam đế êm - Thiết kế trẻ trung, chất liệu vải thoáng khí, đế cao su chống trơn trượt, nhiều size từ 39-44.",
    },
  ];

  // DOM Elements
  const productsGrid = document.getElementById("products-grid");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.querySelector(".cart-count");
  const totalPrice = document.querySelector(".total-price");
  const cartModal = document.getElementById("cart-modal");
  const paymentModal = document.getElementById("payment-modal");
  const productModal = document.getElementById("product-modal");
  const productDetail = document.getElementById("product-detail");
  const searchInput = document.querySelector(".search-bar input");
  const sortSelect = document.getElementById("sort");
  const categorySelect = document.getElementById("category");
  const banners = document.querySelectorAll(".banner");
  const prevBannerBtn = document.querySelector(".prev-banner");
  const nextBannerBtn = document.querySelector(".next-banner");
  const cartIcon = document.querySelector(".cart-icon");
  const loginBtn = document.querySelector(".login-btn");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const confirmPaymentBtn = document.querySelector(".confirm-payment");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const paymentContents = document.querySelectorAll(".payment-content");

  // State
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentBannerIndex = 0;
  let currentPaymentMethod = "qr";

  // Initialize the page
  function init() {
    renderProducts(products);
    updateCartCount();
    setupEventListeners();
    startBannerRotation();
  }

  // Set up event listeners
  function setupEventListeners() {
    // Cart icon click
    cartIcon.addEventListener("click", openCartModal);

    // Login button click
    loginBtn.addEventListener("click", () => {
      alert("Chức năng đăng nhập đang được phát triển");
    });

    // Search input
    searchInput.addEventListener("input", handleSearch);

    // Sort and filter changes
    sortSelect.addEventListener("change", handleSortFilterChange);
    categorySelect.addEventListener("change", handleSortFilterChange);

    // Banner controls
    prevBannerBtn.addEventListener("click", showPrevBanner);
    nextBannerBtn.addEventListener("click", showNextBanner);

    // Modal close buttons
    document.querySelectorAll(".close").forEach((btn) => {
      btn.addEventListener("click", () => {
        cartModal.style.display = "none";
        paymentModal.style.display = "none";
        productModal.style.display = "none";
      });
    });

    // Checkout button
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
      }
      cartModal.style.display = "none";
      paymentModal.style.display = "block";
    });

    // Thay thế hàm xác nhận thanh toán hiện tại
    confirmPaymentBtn.addEventListener("click", () => {
      if (currentPaymentMethod === "qr") {
        // Hiển thị thông báo yêu cầu xác nhận thủ công
        const isConfirmed = confirm(
          "Sau khi KHÁCH HÀNG chuyển khoản thành công, bạn đã kiểm tra và NHẬN ĐƯỢC TIỀN chưa?"
        );

        if (isConfirmed) {
          alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
          cart = [];
          updateCart();
          paymentModal.style.display = "none";
        } else {
          alert("Vui lòng kiểm tra lại tài khoản trước khi xác nhận.");
        }
      } else {
        // Xử lý các phương thức thanh toán khác
        alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
        cart = [];
        updateCart();
        paymentModal.style.display = "none";
      }
    });

    // Payment method selection
    paymentMethods.forEach((method) => {
      method.addEventListener("click", () => {
        paymentMethods.forEach((m) => m.classList.remove("active"));
        method.classList.add("active");
        currentPaymentMethod = method.dataset.method;

        paymentContents.forEach((content) => {
          content.classList.add("hidden");
          if (content.id === `${currentPaymentMethod}-payment`) {
            content.classList.remove("hidden");
          }
        });
      });
    });

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === cartModal) cartModal.style.display = "none";
      if (e.target === paymentModal) paymentModal.style.display = "none";
      if (e.target === productModal) productModal.style.display = "none";
    });
  }

  // Render products to the grid
  function renderProducts(productsToRender) {
    productsGrid.innerHTML = "";

    if (productsToRender.length === 0) {
      productsGrid.innerHTML =
        '<p class="no-products">Không tìm thấy sản phẩm phù hợp</p>';
      return;
    }

    productsToRender.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        ${formatPrice(product.price)}
                        ${
                          product.originalPrice > product.price
                            ? `<span class="product-original-price">${formatPrice(
                                product.originalPrice
                              )}</span>`
                            : ""
                        }
                    </div>
                    <div class="product-rating">
                        ${renderStars(product.rating)}
                        <span>(${product.ratingCount})</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${
                          product.id
                        }">Thêm vào giỏ</button>
                        <button class="view-detail" data-id="${
                          product.id
                        }">Xem chi tiết</button>
                    </div>
                </div>
            `;
      productsGrid.appendChild(productCard);
    });

    // Add event listeners to newly created buttons
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
      });
    });

    document.querySelectorAll(".view-detail").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        showProductDetail(productId);
      });
    });
  }

  // Render stars for rating
  function renderStars(rating) {
    let stars = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars += '<i class="fas fa-star"></i>';
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }

    return stars;
  }

  // Format price with VND
  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  /// Handle search functionality
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
  }

  // Handle sort and filter changes
  function handleSortFilterChange() {
    const sortBy = sortSelect.value;
    const category = categorySelect.value;

    let filteredProducts = [...products];

    // Filter by category
    if (category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    // Sort products
    switch (sortBy) {
      case "newest":
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "popular":
      default:
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }

    renderProducts(filteredProducts);
  }

  // Cart functionality
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    updateCart();
    showAddedToCartAlert(product.name);
  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
  }

  function renderCartItems() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML =
        '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
      totalPrice.textContent = "0 ₫";
      return;
    }

    let total = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">${formatPrice(
                      item.price
                    )}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${
                          item.id
                        }">-</button>
                        <input type="number" class="quantity-input" value="${
                          item.quantity
                        }" min="1" data-id="${item.id}">
                        <button class="quantity-btn increase" data-id="${
                          item.id
                        }">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${
                  item.id
                }"><i class="fas fa-times"></i></button>
            `;
      cartItems.appendChild(cartItem);

      total += item.price * item.quantity;
    });

    totalPrice.textContent = formatPrice(total);

    // Add event listeners to quantity controls
    document.querySelectorAll(".decrease").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        updateCartItemQuantity(productId, -1);
      });
    });

    document.querySelectorAll(".increase").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        updateCartItemQuantity(productId, 1);
      });
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const productId = parseInt(e.target.dataset.id);
        const newQuantity = parseInt(e.target.value);

        if (newQuantity < 1) {
          e.target.value = 1;
          return;
        }

        const item = cart.find((item) => item.id === productId);
        if (item) {
          item.quantity = newQuantity;
          updateCart();
        }
      });
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        removeFromCart(productId);
      });
    });
  }

  function updateCartItemQuantity(productId, change) {
    const item = cart.find((item) => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity < 1) {
      item.quantity = 1;
    }

    updateCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
  }

  function openCartModal() {
    renderCartItems();
    cartModal.style.display = "block";
  }

  function showAddedToCartAlert(productName) {
    const alert = document.createElement("div");
    alert.className = "add-to-cart-alert";
    alert.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Đã thêm "${productName}" vào giỏ hàng</span>
        `;
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.classList.add("show");
    }, 10);

    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(alert);
      }, 300);
    }, 3000);
  }

  // Product detail functionality
  function showProductDetail(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const discount = Math.round(
      (1 - product.price / product.originalPrice) * 100
    );

    productDetail.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h1 class="product-detail-name">${product.name}</h1>
                <div class="product-detail-price">
                    ${formatPrice(product.price)}
                    ${
                      product.originalPrice > product.price
                        ? `<span class="product-detail-original-price">${formatPrice(
                            product.originalPrice
                          )}</span>
                         <span class="product-detail-discount">-${discount}%</span>`
                        : ""
                    }
                </div>
                <div class="product-detail-rating">
                    <div class="product-detail-rating-stars">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="product-detail-rating-count">${
                      product.ratingCount
                    } đánh giá</span>
                </div>
                <div class="product-detail-description">
                    <h3>Mô tả sản phẩm</h3>
                    <p>${product.description}</p>
                </div>
                <div class="product-detail-actions">
                    <button class="product-detail-add-to-cart" data-id="${
                      product.id
                    }">Thêm vào giỏ hàng</button>
                    <button class="product-detail-buy-now" data-id="${
                      product.id
                    }">Mua ngay</button>
                </div>
            </div>
        `;

    // Add event listeners to buttons
    document
      .querySelector(".product-detail-add-to-cart")
      .addEventListener("click", () => {
        addToCart(product.id);
      });

    document
      .querySelector(".product-detail-buy-now")
      .addEventListener("click", () => {
        addToCart(product.id);
        productModal.style.display = "none";
        openCartModal();
      });

    productModal.style.display = "block";
  }

  // Banner functionality
  function startBannerRotation() {
    setInterval(() => {
      showNextBanner();
    }, 5000);
  }

  function showBanner(index) {
    banners.forEach((banner, i) => {
      banner.classList.toggle("active", i === index);
    });
    currentBannerIndex = index;
  }

  function showNextBanner() {
    const nextIndex = (currentBannerIndex + 1) % banners.length;
    showBanner(nextIndex);
  }

  function showPrevBanner() {
    const prevIndex =
      (currentBannerIndex - 1 + banners.length) % banners.length;
    showBanner(prevIndex);
  }

  // Initialize the app
  init();
});
// Cập nhật số tiền khi mở modal thanh toán
function updatePaymentAmount() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector(".payment-amount").textContent = formatPrice(total);
}

// Sửa lại hàm xác nhận thanh toán
confirmPaymentBtn.addEventListener("click", () => {
  if (currentPaymentMethod === "qr") {
    const isChecked = document.getElementById("payment-confirmed").checked;

    if (!isChecked) {
      alert("Vui lòng xác nhận bạn đã chuyển khoản thành công!");
      return;
    }

    const isConfirmed = confirm(
      "Bạn đã KIỂM TRA TÀI KHOẢN và chắc chắn ĐÃ NHẬN ĐƯỢC TIỀN?"
    );

    if (isConfirmed) {
      alert("Thanh toán thành công! Đơn hàng sẽ được xử lý.");
      cart = [];
      updateCart();
      paymentModal.style.display = "none";
    }
  } else {
    // Xử lý các phương thức khác
    alert("Thanh toán thành công!");
    cart = [];
    updateCart();
    paymentModal.style.display = "none";
  }
});

// Gọi hàm này khi mở modal thanh toán
paymentModal.addEventListener("show", () => {
  updatePaymentAmount();
  document.getElementById("payment-confirmed").checked = false;
});
