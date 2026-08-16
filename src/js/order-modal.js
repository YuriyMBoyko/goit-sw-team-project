import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  overlay: document.querySelector('[data-order-modal-overlay]'),
  closeBtn: document.querySelector('[data-order-modal-close]'),
  form: document.querySelector('[data-order-form]'),
  nameInput: document.querySelector('[data-order-name]'),
  phoneInput: document.querySelector('[data-order-phone]'),
  commentInput: document.querySelector('[data-order-comment]'),
};

let currentDessertId = null;

export function openOrderModal(dessertId) {
  if (!refs.overlay) return;
  currentDessertId = dessertId;
  refs.overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEscape);
}

function closeOrderModal() {
  if (!refs.overlay) return;
  refs.overlay.hidden = true;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(event) {
  if (event.key === 'Escape') closeOrderModal();
}

function validateForm() {
  console.log(
    'validateForm called, name:',
    refs.nameInput.value,
    'phone:',
    refs.phoneInput.value
  );

  let isValid = true;

  if (!refs.nameInput.value.trim()) {
    refs.nameInput.classList.add('is-invalid');
    isValid = false;
  } else {
    refs.nameInput.classList.remove('is-invalid');
  }

  const phonePattern = /^380\d{9}$/;
  if (!phonePattern.test(refs.phoneInput.value.trim())) {
    refs.phoneInput.classList.add('is-invalid');
    isValid = false;
  } else {
    refs.phoneInput.classList.remove('is-invalid');
  }

  console.log('validateForm result:', isValid);
  return isValid;
}

async function handleSubmit(event) {
  event.preventDefault();
  console.log('handleSubmit called');

  if (!validateForm()) return;

  const orderData = {
    name: refs.nameInput.value.trim(),
    phone: refs.phoneInput.value.trim(),
    dessertId: currentDessertId,
    comment: refs.commentInput.value.trim(),
  };

  try {
    const response = await fetch(
      'https://deserts-store.b.goit.study/api/orders',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error('Помилка при відправці замовлення');
    }

    const result = await response.json();

    iziToast.success({
      title: 'Успіх',
      message: `Замовлення №${result.orderNum} успішно оформлено!`,
      position: 'topRight',
    });

    refs.form.reset();
    closeOrderModal();
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: error.message,
      position: 'topRight',
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!refs.overlay) return;

  refs.closeBtn.addEventListener('click', closeOrderModal);

  refs.overlay.addEventListener('click', event => {
    if (event.target === refs.overlay) closeOrderModal();
  });

  refs.form.addEventListener('submit', handleSubmit);
});
