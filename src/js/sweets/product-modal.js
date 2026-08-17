import { fetchDessert } from '../api.js';
import { openOrderModal } from '../order-modal.js';
import { showError } from '../helpers.js';
import { STRINGS } from '../consts.js';

let backdrop, closeBtn, orderBtn;
let currentProductId = null;

function generateStars(rating) {
  if (!rating || isNaN(rating)) return '';
  const maxStars = 5;
  const fullStars = Math.round(rating);
  let starsHtml = '';

  for (let i = 1; i <= maxStars; i++) {
    if (i <= fullStars) {
      starsHtml += `<span class="star filled">★</span>`;
    } else {
      starsHtml += `<span class="star empty">★</span>`;
    }
  }
  return starsHtml;
}

export async function openProductModal(productId) {
  currentProductId = productId;
  
  try {
    const productData = await fetchDessert(productId);

    backdrop = document.getElementById('product-modal-backdrop');
    closeBtn = document.getElementById('close-modal-btn');
    orderBtn = document.getElementById('order-button');

    if (!backdrop) return;

    const image = document.getElementById('modal-image');
    const title = document.getElementById('modal-title');
    const price = document.getElementById('modal-price');
    const rating = document.getElementById('modal-rating');
    const description = document.getElementById('modal-description');
    const composition = document.getElementById('modal-composition');

    if (image) {
      image.src = productData.image;
      image.alt = productData.name;
    }
    if (title) title.textContent = productData.name;
    if (price) price.textContent = productData.price;
    if (description) description.textContent = productData.description;
    if (composition) composition.textContent = productData.composition;
    if (rating) rating.innerHTML = generateStars(productData.rate);

    closeBtn.addEventListener('click', closeProductModal);
    backdrop.addEventListener('click', handleBackdropClick);
    document.addEventListener('keydown', handleEscapeKey);
    orderBtn.addEventListener('click', handleOrderClick);

    backdrop.removeAttribute('hidden');
    document.body.style.overflow = 'hidden'; 

  } catch (error) {
    console.error('Помилка відкриття модалки:', error);
    showError(`${STRINGS.ERROR_LOAD_DESSERT}<br/><br/>${error}`)
  }
}

function closeProductModal() {
  backdrop.setAttribute('hidden', 'true');
  document.body.style.overflow = '';

  closeBtn.removeEventListener('click', closeProductModal);
  backdrop.removeEventListener('click', handleBackdropClick);
  document.removeEventListener('keydown', handleEscapeKey);
  orderBtn.removeEventListener('click', handleOrderClick);
}

function handleBackdropClick(event) {
  if (event.target === backdrop) closeProductModal();
}

function handleEscapeKey(event) {
  if (event.code === 'Escape') closeProductModal();
}

function handleOrderClick(event) {
  closeProductModal();
  openOrderModal(currentProductId); 
}