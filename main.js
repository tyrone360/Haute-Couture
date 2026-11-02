document.addEventListener('DOMContentLoaded', () => {
  const cartCountEl = document.getElementById('cart-count');
  const cartBtn = document.getElementById('cart-btn');
  const cartItemsEl = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');
  const checkoutForm = document.getElementById('checkout-form');
  const orderSuccessEl = document.getElementById('checkout-success');
  const orderSummaryEl = document.getElementById('order-summary');
  const heroSloganEl = document.getElementById('hero-slogan');
  const scrollWordEls = document.querySelectorAll('.scroll-words-track span');
  const cultureSlides = document.querySelectorAll('.culture-slide');
  const promoDaysEl = document.getElementById('promo-days');
  const promoHoursEl = document.getElementById('promo-hours');
  const promoMinutesEl = document.getElementById('promo-minutes');
  const promoSecondsEl = document.getElementById('promo-seconds');

  let lightbox = document.getElementById('product-lightbox');
//
  const CART_KEY = 'fashionCart';
  const COUNT_KEY = 'cartCount';
  const ORDER_KEY = 'latestOrder';

  // EMAILJS CONFIGURATION
  const EMAILJS_PUBLIC_KEY = 'jrdAX27VnR-pmEL1x';
  const EMAILJS_SERVICE_ID = 'service_xosfsw7';
  const EMAILJS_ORDER_TEMPLATE_ID = 'template_w9vyu6a';

  const formatCurrency = (value) =>
    `R${Number(value || 0).toFixed(2)}`;

  const escapeHTML = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);

  const initProductInteractions = () => {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card) => {
      const image = card.querySelector('img');
      if (!image) return;

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
const initPromoCountdown = () => {
  if (!promoDaysEl || !promoHoursEl || !promoMinutesEl || !promoSecondsEl) return;

  // Promotion ends on 16 June 2027 at 23:59 South African time.
  const countdownTarget = new Date('2027-06-16T23:59:00+02:00').getTime();

  const updateCountdown = () => {
    const remaining = countdownTarget - Date.now();

    if (remaining <= 0) {
      promoDaysEl.textContent = '00';
      promoHoursEl.textContent = '00';
      promoMinutesEl.textContent = '00';
      promoSecondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    promoDaysEl.textContent = String(days).padStart(2, '0');
    promoHoursEl.textContent = String(hours).padStart(2, '0');
    promoMinutesEl.textContent = String(minutes).padStart(2, '0');
    promoSecondsEl.textContent = String(seconds).padStart(2, '0');
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
};
        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;

        card.classList.remove('is-shaking');
        void card.offsetWidth;
        card.classList.add('is-shaking');
      });

      card.addEventListener('pointerleave', () => {
        card.classList.remove('is-shaking');
        card.style.transform = '';
      });

      image.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!lightbox) {
          lightbox = document.createElement('div');
          lightbox.id = 'product-lightbox';
          lightbox.className = 'image-lightbox';

          lightbox.innerHTML = `
            <div class="image-lightbox-inner">
              <button class="image-lightbox-close"
                      type="button"
                      aria-label="Close image">×</button>
              <img src="" alt="Expanded product preview">
            </div>
          `;

          document.body.appendChild(lightbox);

          const closeButton =
            lightbox.querySelector('.image-lightbox-close');

          closeButton.addEventListener('click', () => {
            lightbox.classList.remove('visible');
          });

          lightbox.addEventListener('click', (clickEvent) => {
            if (clickEvent.target === lightbox) {
              lightbox.classList.remove('visible');
            }
          });
        }

        const lightboxImage = lightbox.querySelector('img');

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || 'Expanded product preview';

        lightbox.classList.add('visible');
      });
    });
  };

  const rotateHeroSlogans = () => {
    if (!heroSloganEl) return;

    const slogans = [
      ['OWN', 'THE', 'LOOK.'],
      ['MOVE', 'WITH', 'EDGE.'],
      ['FUEL', 'THE', 'CITY.'],
      ['LIVE', 'LOUD.', 'NOW']
    ];

    const currentSlogan =
      slogans[Math.floor(Date.now() / 2600) % slogans.length];

    const colorClasses = [
      'word-vivid',
      'word-bright',
      'word-warm'
    ];

    heroSloganEl.innerHTML = currentSlogan
      .map((word, index) =>
        `<span class="rotating-word ${colorClasses[index % colorClasses.length]}">${word}</span>`
      )
      .join(' ');

    heroSloganEl.classList.remove('is-rotating');
    void heroSloganEl.offsetWidth;
    heroSloganEl.classList.add('is-rotating');
  };

  const initPromoCountdown = () => {
    if (!promoDaysEl || !promoHoursEl || !promoMinutesEl || !promoSecondsEl) return;

    const countdownTarget = Date.now() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (42 * 60 * 1000) + (18 * 1000);

    const updateCountdown = () => {
      const remaining = countdownTarget - Date.now();

      if (remaining <= 0) {
        promoDaysEl.textContent = '00';
        promoHoursEl.textContent = '00';
        promoMinutesEl.textContent = '00';
        promoSecondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      promoDaysEl.textContent = String(days).padStart(2, '0');
      promoHoursEl.textContent = String(hours).padStart(2, '0');
      promoMinutesEl.textContent = String(minutes).padStart(2, '0');
      promoSecondsEl.textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  };

  // ==========================================
  // SCROLL ANIMATION
  // ==========================================

  const syncScrollWords = () => {
    const scrollY = window.scrollY;

    scrollWordEls.forEach((word, index) => {
      const offset = scrollY * (0.18 + index * 0.06);
      const angle =
        Math.sin((scrollY + index * 100) / 120) * 10;

      word.style.setProperty(
        '--shift',
        `${Math.min(20, Math.max(-20, offset * 0.08))}px`
      );

      word.style.setProperty('--angle', `${angle}deg`);

      word.classList.toggle(
        'is-active',
        scrollY > 120 + index * 45
      );
    });
  };

  // ==========================================
  // CULTURE SLIDES
  // ==========================================

  const initCultureSlides = () => {
    if (!cultureSlides.length) return;

    let currentSlide = 0;

    const showSlide = (index) => {
      cultureSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle(
          'active',
          slideIndex === index
        );
      });
    };

    setInterval(() => {
      currentSlide = (currentSlide + 1) % cultureSlides.length;
      showSlide(currentSlide);
    }, 3200);
  };

  // ==========================================
  // SHOPPING CART
  // ==========================================

  const getCartItems = () => {
    try {
      const items = JSON.parse(
        localStorage.getItem(CART_KEY) || '[]'
      );

      return Array.isArray(items) ? items : [];

    } catch (error) {
      return [];
    }
  };

  const setCartItems = (items) => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(items)
    );

    localStorage.setItem(
      COUNT_KEY,
      String(items.length)
    );
  };

  const syncCartCount = () => {
    const cartCount = getCartItems().length;

    if (cartCountEl) {
      cartCountEl.textContent = cartCount;
    }

    if (cartBtn) {
      cartBtn.href = 'cart.html';

      cartBtn.setAttribute(
        'aria-label',
        `Shopping cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`
      );
    }
  };

  const addItemToCart = (name, price, image) => {
    const items = getCartItems();

    items.push({
      name,
      price: Number(price) || 0,
      image: image || ''
    });

    setCartItems(items);
    syncCartCount();
  };

  // ==========================================
  // DISPLAY CART
  // ==========================================

  const renderCart = () => {
    if (!cartItemsEl) return;

    const items = getCartItems();

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );

    const shipping =
      subtotal > 0 ? (subtotal >= 1000 ? 0 : 45) : 0;

    const total = subtotal + shipping;

    if (subtotalEl) {
      subtotalEl.textContent = formatCurrency(subtotal);
    }

    if (shippingEl) {
      shippingEl.textContent = formatCurrency(shipping);
    }

    if (totalEl) {
      totalEl.textContent = formatCurrency(total);
    }

    if (!items.length) {
      cartItemsEl.innerHTML = `
        <p class="empty-cart">
          Your cart is empty. Add a product to continue.
        </p>
      `;
      return;
    }

    cartItemsEl.innerHTML = items
      .map((item, index) => `
        <div class="cart-item">

          <div class="cart-item-details">

            ${item.image
              ? `<img src="${escapeHTML(item.image)}"
                      alt="${escapeHTML(item.name)}">`
              : ''}

            <div>
              <h4>${escapeHTML(item.name)}</h4>
              <p>${formatCurrency(item.price)}</p>
            </div>

          </div>

          <button type="button"
                  class="remove-item"
                  data-index="${index}">
            Remove
          </button>

        </div>
      `)
      .join('');

    cartItemsEl.querySelectorAll('.remove-item')
      .forEach((removeBtn) => {

        removeBtn.addEventListener('click', () => {
          const currentItems = getCartItems();

          const indexToRemove =
            Number(removeBtn.dataset.index);

          currentItems.splice(indexToRemove, 1);

          setCartItems(currentItems);
          syncCartCount();
          renderCart();
        });

      });
  };

  // ==========================================
  // ADD TO CART BUTTONS
  // ==========================================

  const productButtons =
    document.querySelectorAll('.add-to-cart');

  productButtons.forEach((btn) => {
    const originalText = btn.textContent.trim();

    btn.addEventListener('click', () => {

      btn.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(0.98)' },
          { transform: 'scale(1)' }
        ],
        { duration: 220 }
      );

      btn.textContent = 'Added ✓';

      addItemToCart(
        btn.dataset.name || 'Product',
        btn.dataset.price || 0,
        btn.dataset.image || ''
      );

      if (cartBtn) {
        cartBtn.animate(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-4px)' },
            { transform: 'translateY(0)' }
          ],
          { duration: 300 }
        );
      }

      setTimeout(() => {
        btn.textContent = originalText;
      }, 900);

    });
  });

  // ==========================================
  // ORDER CONFIRMATION DISPLAY
  // ==========================================

  const renderOrderSummary = (order) => {
    if (!orderSummaryEl) return;

    orderSummaryEl.classList.add('visible');

    orderSummaryEl.innerHTML = `
      <h4>Order details</h4>

      <p>
        <strong>Order number:</strong>
        ${escapeHTML(order.orderId)}
      </p>

      ${order.fullName ? `
        <p>
          <strong>Receiver:</strong>
          ${escapeHTML(order.fullName)}
        </p>
      ` : ''}

      ${order.address ? `
        <p>
          <strong>Delivery address:</strong>
          ${escapeHTML(order.address)},
          ${escapeHTML(order.city)},
          ${escapeHTML(order.state)},
          ${escapeHTML(order.zip)},
          ${escapeHTML(order.country)}
        </p>
      ` : ''}

      <p>
        <strong>Order total:</strong>
        ${formatCurrency(order.total)}
      </p>

      <p>
        <strong>Order status:</strong>
        Pending confirmation
      </p>
    `;
  };

  // ==========================================
  // EMAILJS CHECKOUT INTEGRATION
  // ==========================================

  if (checkoutForm) {

    // Initialize EmailJS.
    if (typeof emailjs !== 'undefined') {

      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
      });

    } else {
      console.error(
        'EmailJS SDK not found. Check the script in cart.html.'
      );
    }

    checkoutForm.addEventListener('submit', async (event) => {

      event.preventDefault();

      const items = getCartItems();

      // Check whether the cart is empty.
      if (!items.length) {

        if (orderSuccessEl) {
          orderSuccessEl.hidden = false;
          orderSuccessEl.className =
            'message error-message';

          orderSuccessEl.textContent =
            'Your cart is empty. Add a product before placing an order.';
        }

        return;
      }

      // Validate customer information.
      if (!checkoutForm.reportValidity()) {
        return;
      }

      // Check EmailJS availability.
      if (typeof emailjs === 'undefined') {

        orderSuccessEl.hidden = false;
        orderSuccessEl.className =
          'message error-message';

        orderSuccessEl.textContent =
          'Email service is unavailable. Please refresh and try again.';

        return;
      }

      const submitButton =
        checkoutForm.querySelector('button[type="submit"]');

      if (!submitButton || submitButton.disabled) return;

      const formData = new FormData(checkoutForm);

      // Calculate order totals.
      const subtotal = items.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      );

      const shipping =
        subtotal >= 1000 ? 0 : 45;

      const total = subtotal + shipping;

      // Generate order number.
      const orderId =
        `HC-${Date.now().toString().slice(-8)}`;

      // Generate delivery information.
      const deliveryAddress =
        `${formData.get('address')}, ` +
        `${formData.get('city')}, ` +
        `${formData.get('state')}, ` +
        `${formData.get('zip')}, ` +
        `${formData.get('country')}`;

      // Prepare products for the email.
      const orderItems = items
        .map((item, index) =>
          `${index + 1}. ${item.name} - ${formatCurrency(item.price)}`
        )
        .join('\n');

      // Create order object.
      const order = {
        orderId,

        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),

        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip'),
        country: formData.get('country'),

        notes:
          formData.get('notes') || 'No delivery instructions',

        items,
        subtotal,
        shipping,
        total,

        status: 'Pending confirmation',

        createdAt: new Date().toISOString()
      };

      // Match these parameters with EmailJS.
      const templateParams = {

        order_id: order.orderId,

        customer_name: order.fullName,

        customer_email: order.email,

        customer_phone: order.phone,

        delivery_address: deliveryAddress,

        order_items: orderItems,

        subtotal: formatCurrency(order.subtotal),

        shipping: formatCurrency(order.shipping),

        total: formatCurrency(order.total),

        delivery_notes: order.notes

      };

      // Disable the button while sending.
      submitButton.disabled = true;
      submitButton.textContent = 'Sending order...';

      if (orderSuccessEl) {
        orderSuccessEl.hidden = false;
        orderSuccessEl.className = 'message';

        orderSuccessEl.textContent =
          'Submitting your order. Please wait...';
      }

      try {

        // Send order notification through EmailJS.
        const response = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_ORDER_TEMPLATE_ID,
          templateParams
        );

        if (response.status !== 200) {
          throw new Error('EmailJS could not confirm the email.');
        }

        // Save order information for the confirmation page.
        sessionStorage.setItem(
          'orderConfirmationData',
          JSON.stringify(order)
        );

        // Save a limited order receipt locally.
        const orderReceipt = {
          orderId: order.orderId,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt
        };

        localStorage.setItem(
          ORDER_KEY,
          JSON.stringify(orderReceipt)
        );

        // Clear cart after successful email submission.
        setCartItems([]);

        syncCartCount();
        renderCart();

        // Redirect customer to confirmation page.
        window.location.href = 'order-confirmation.html';
        return;

        // Display success message.
        if (orderSuccessEl) {

          orderSuccessEl.hidden = false;

          orderSuccessEl.className =
            'message success-message';

          orderSuccessEl.innerHTML = `
            <strong>✓ Order submitted successfully!</strong><br>

            Your order number is
            <strong>${escapeHTML(order.orderId)}</strong>.<br>

            We have received your order request.<br>

            We will contact you to confirm payment
            and arrange delivery.
          `;
        }

        // Display order information.
        renderOrderSummary(order);

        // Clear customer information from the form.
        checkoutForm.reset();

      } catch (error) {

        console.error('EmailJS order error:', error);

        if (orderSuccessEl) {

          orderSuccessEl.hidden = false;

          orderSuccessEl.className =
            'message error-message';

          orderSuccessEl.textContent =
            'We could not submit your order. Your cart has been preserved. Please try again.';
        }

      } finally {

        // Re-enable the submit button.
        submitButton.disabled = false;
        submitButton.textContent = 'Place order';

      }

    });

  }

  // ==========================================
  // DISPLAY LAST ORDER RECEIPT
  // ==========================================

  let savedOrder = null;

  try {
    savedOrder = JSON.parse(
      localStorage.getItem(ORDER_KEY) || 'null'
    );
  } catch (error) {
    console.error('Could not read saved order:', error);
  }

  if (
    savedOrder &&
    orderSuccessEl &&
    orderSummaryEl &&
    checkoutForm
  ) {

    orderSuccessEl.hidden = false;

    orderSuccessEl.className =
      'message success-message';

    orderSuccessEl.innerHTML = `
      <strong>✓ Previous order submitted</strong><br>

      Your order number is
      <strong>${escapeHTML(savedOrder.orderId)}</strong>.
    `;

    renderOrderSummary(savedOrder);
  }

  // ==========================================
  // CART NAVIGATION
  // ==========================================

  if (cartBtn) {
    cartBtn.href = 'cart.html';
  }

  // ==========================================
  // START WEBSITE ANIMATIONS
  // ==========================================

  if (heroSloganEl) {
    rotateHeroSlogans();

    setInterval(rotateHeroSlogans, 2600);
  }

  initPromoCountdown();
  initCultureSlides();
  initProductInteractions();

  if (scrollWordEls.length) {
    syncScrollWords();

    window.addEventListener(
      'scroll',
      syncScrollWords,
      { passive: true }
    );
  }

  // Initialize shopping cart.
  syncCartCount();
  renderCart();

  // ==========================================
  // CARD MOUSE INTERACTIONS
  // ==========================================

  const cards = Array.from(
    document.querySelectorAll('.card')
  );

  window.addEventListener('mousemove', (event) => {

    const x = event.clientX;
    const y = event.clientY;

    cards.forEach((card) => {

      const rect = card.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = x - cx;
      const dy = y - cy;

      const dist = Math.hypot(dx, dy);

      const max = 400;

      const t = Math.max(0, 1 - dist / max);

      card.style.setProperty(
        '--wave',
        (t * 1.2).toFixed(3)
      );

      card.style.setProperty(
        '--dx',
        (dx / 30).toFixed(2) + 'px'
      );

      card.style.setProperty(
        '--dy',
        (dy / 30).toFixed(2) + 'px'
      );

    });

  });

});
