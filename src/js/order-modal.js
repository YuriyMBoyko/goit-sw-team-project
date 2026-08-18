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

  refs.nameInput.addEventListener('input', handleNameValidation);
  refs.phoneInput.addEventListener('input', handlePhoneValidation);
  refs.commentInput.addEventListener('input', handleCommentValidation);
}

function closeOrderModal() {
  if (!refs.overlay) return;
  refs.overlay.classList.toggle('is-open', false);
  document.removeEventListener('keydown', handleEscape);

  refs.nameInput.removeEventListener('input', handleNameValidation);
  refs.phoneInput.removeEventListener('input', handlePhoneValidation);
  refs.commentInput.removeEventListener('input', handleCommentValidation);
}

function handleEscape(event) {
  if (event.key === 'Escape') closeOrderModal();
}

function isNameValid(name) {
  return (name.length >= 5) && (name.length <= 28);
}

function validateName(selectorOrElement, name) {
  const isValid = isNameValid(name);
  showOrderError(selectorOrElement, (!isValid) ? 'Ім\'я має містити від 5 до 28 символів' : '');
  return isValid;
}

function isPhoneValid(phone) {
  const phonePattern = /^380\d{9}$/;
  return phonePattern.test(phone);
}

function validatePhone(selectorOrElement, phone) {
  const isValid = isPhoneValid(phone);
  showOrderError(selectorOrElement, (!isValid) ? 'Номер телефону повинен містити 12 цифр' : '');
  return isValid;
}

function isCommentValid(comment) {
  return (comment.length >= 10) && (comment.length <= 256);
}

function validateComment(selectorOrElement, comment) {
  const isValid = isCommentValid(comment);
  showOrderError(selectorOrElement, (!isValid) ? 'Коментар повинен містити від 10 до 256 символів' : '');
  return isValid;
}

function validateForm({ name, phone, comment }) {
  let isValid = true;

  if (!validateName(refs.nameInput, name)) {
    isValid = false;
  }

  if (!validatePhone(refs.phoneInput, phone)) {
    isValid = false;
  }

  if (!validateComment(refs.commentInput, comment)) {
    isValid = false;
  }

  return isValid;
}

function showOrderError(selectorOrElement, message) {
  const element = getElement(selectorOrElement);

  if (element) {
    element.classList.toggle(CSS_CLASSES.IS_INVALID, (message.length !== 0));
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

function showOrderErrorMessage(selectorOrElement, message) {
  const element = getElement(selectorOrElement);
  if (element) {
    const nextElement = element.nextElementSibling;
    if (nextElement && nextElement.matches('.order-form-error')) {
      nextElement.textContent = message;
    }
  }
}

function handleNameValidation(event) {
  validateName(refs.nameInput, event.target.value.trim());
}

function handlePhoneValidation(event) {
  validatePhone(refs.phoneInput, event.target.value.trim());
}

function handleCommentValidation(event) {
  validateComment(refs.commentInput, event.target.value.trim());
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
