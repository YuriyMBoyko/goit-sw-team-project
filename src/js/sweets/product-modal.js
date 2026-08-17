import { openOrderModal } from '../order-modal.js';

const BASE_URL = 'https://deserts-store.b.goit.study/api';

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
    const response = await fetch(`${BASE_URL}/desserts/${productId}`);
    if (!response.ok) throw new Error('Помилка завантаження даних');
    
    const productData = await response.json();

    backdrop = document.getElementById('productModalBackdrop');
    closeBtn = document.getElementById('closeModalBtn');
    orderBtn = document.getElementById('orderButton');

    if (!backdrop) return;

    const image = document.getElementById('modalImage');
    const title = document.getElementById('modalTitle');
    const price = document.getElementById('modalPrice');
    const rating = document.getElementById('modalRating');
    const description = document.getElementById('modalDescription');
    const composition = document.getElementById('modalComposition');

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

function handleOrderClick() {
  closeProductModal();
  openOrderModal(currentProductId); 
}