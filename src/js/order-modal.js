import { postOrder } from './api.js';
import { CSS_CLASSES } from './consts.js';
import { getElement, showOrderSuccess, showError } from './helpers.js';

const refs = {
  overlay: document.querySelector('[data-order-modal-overlay]'),
  closeBtn: document.querySelector('[data-order-modal-close]'),
  form: document.querySelector('[data-order-form]'),
  nameInput: document.querySelector('[data-order-name]'),
  phoneInput: document.querySelector('[data-order-phone]'),
  commentInput: document.querySelector('[data-order-comment]'),
};

let currentDessertId = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!refs.overlay) return;

  refs.closeBtn.addEventListener('click', closeOrderModal);

  refs.overlay.addEventListener('click', event => {
    if (event.target === refs.overlay) closeOrderModal();
  });

  refs.form.addEventListener('submit', handleSubmit);
});

export function openOrderModal(dessertId) {
  if (!refs.overlay) return;
  currentDessertId = dessertId;
  refs.overlay.classList.toggle('is-open', true);
  document.addEventListener('keydown', handleEscape);
}

function closeOrderModal() {
  if (!refs.overlay) return;
  refs.overlay.classList.toggle('is-open', false);
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(event) {
  if (event.key === 'Escape') closeOrderModal();
}

function validateName(name) {
/*  
  const namePattern = /^[a-zA-Z\s\.]{5,28}$/;
  return namePattern.test(name);
*/
  return (name.length >= 5) && (name.length <= 28);
}

function validatePhone(phone) {
  const phonePattern = /^380\d{9}$/;
  return phonePattern.test(phone);
}

function validateComment(comment) {
  return (comment.length >= 10) && (comment.length <= 256);
}

function validateForm({ name, phone, comment }) {

  console.log(
    'validateForm called: name:',
    name,
    'phone:',
    phone,
    'comment',
    comment
  );

  let isValid = true;

  if (validateName(name)) {
    hideOrderError(refs.nameInput);
  } else {
    showOrderError(refs.nameInput, 'Ім\'я має містити від 5 до 28 символів');
    isValid = false;
  }

  if (validatePhone(phone)) {
    hideOrderError(refs.phoneInput);
  } else {
    showOrderError(refs.phoneInput, 'Номер телефону повинен містити 12 цифр');
    isValie = false;
  }

  if (validateComment(comment)) {
    hideOrderError(refs.commentInput);
  } else {
    showOrderError(refs.commentInput, 'Коментар повинен містити від 10 до 256 символів');
    isValid = false;
  }

  console.log('validateForm result:', isValid);
  return isValid;
}

function showOrderError(selectorOrElement, message) {
  const element = getElement(selectorOrElement);

  if (element) {
    element.classList.toggle(CSS_CLASSES.IS_INVALID, true);
    showOrderErrorMessage(element, message);
  }
}

function hideOrderError(selectorOrElement) {
  const element = getElement(selectorOrElement);
  if (element) {
    element.classList.toggle(CSS_CLASSES.IS_INVALID, false);
    showOrderErrorMessage(element, '');
  }
}

function showOrderErrorMessage(elementOrSelector, message) {
  const element = getElement(elementOrSelector);
  if (element) {
    element.dataset.errorMessage = message;
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const orderData = {
    name: refs.nameInput.value.trim(),
    phone: refs.phoneInput.value.trim(),
    dessertId: currentDessertId,
    comment: refs.commentInput.value.trim(),
  };

  if (!validateForm(orderData)) return;

  try {
    postOrder(orderData)
      .then(({ orderNum }) => {
        showOrderSuccess(orderNum);
        closeOrderModal();
      })
      .catch(error => {
        showOrderError(error.message);
      })
      .finally(() => {
        event.target.reset();
      })
  } catch (error) {
    showError(`Щось пішло не так<br/><br/>${error}`);
  }
}
