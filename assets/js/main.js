/**
 * VietWander - Main Application Logic
 * Interactive utilities, wishlist management, toasts, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWishlist();
  initHeaderScroll();
  initNewsletterForm();
});

/**
 * Navbar scroll behavior & active link detection
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initNavbar() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link-custom');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || (href === '/' && (currentPath === '/' || currentPath.endsWith('index.html'))))) {
      link.classList.add('active');
    }
  });
}

/**
 * Wishlist management with localStorage
 */
const WISHLIST_STORAGE_KEY = 'vietwander_wishlist';

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || ['hoi-an', 'phu-quoc'];
  } catch (e) {
    return ['hoi-an', 'phu-quoc'];
  }
}

function saveWishlist(list) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    updateWishlistUI();
  } catch (e) {
    console.error('Failed to save wishlist', e);
  }
}

function toggleWishlist(destId, destName = '') {
  let list = getWishlist();
  const index = list.indexOf(destId);

  if (index > -1) {
    list.splice(index, 1);
    showToast(`Đã bỏ lưu điểm đến ${destName || destId}`);
  } else {
    list.push(destId);
    showToast(`Đã thêm ${destName || destId} vào danh sách yêu thích!`, 'success');
  }

  saveWishlist(list);
}

function updateWishlistUI() {
  const wishlist = getWishlist();
  const buttons = document.querySelectorAll('[data-wishlist-id]');

  buttons.forEach(btn => {
    const id = btn.getAttribute('data-wishlist-id');
    if (wishlist.includes(id)) {
      btn.classList.add('active');
      const icon = btn.querySelector('svg, i');
      if (icon) {
        icon.style.fill = '#EF4444';
        icon.style.stroke = '#EF4444';
      }
    } else {
      btn.classList.remove('active');
      const icon = btn.querySelector('svg, i');
      if (icon) {
        icon.style.fill = 'none';
        icon.style.stroke = '#94A3B8';
      }
    }
  });

  const countBadge = document.getElementById('wishlist-counter');
  if (countBadge) {
    countBadge.textContent = wishlist.length;
  }
}

function initWishlist() {
  updateWishlistUI();

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-wishlist-id]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    const id = btn.getAttribute('data-wishlist-id');
    const name = btn.getAttribute('data-wishlist-name') || '';
    toggleWishlist(id, name);
  });
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container-custom');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-custom';
  
  const icon = type === 'success' ? '✓ ' : 'ℹ ';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/**
 * Currency formatter (VNĐ)
 */
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!Validation.isValidEmail(email)) {
      showToast('Vui lòng nhập đúng địa chỉ email hợp lệ', 'error');
      emailInput.focus();
      return;
    }

    showToast('Cảm ơn bạn đã đăng ký nhận bản tin du lịch VietWander!', 'success');
    emailInput.value = '';
  });
}

// Global exposure
window.VietWander = {
  showToast,
  formatVND,
  toggleWishlist,
  getWishlist
};
