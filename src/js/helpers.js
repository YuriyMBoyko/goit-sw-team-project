import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import Swal from 'sweetalert2';
import { CSS_CLASSES, STRINGS } from './consts.js';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function toggleElementVisibility(selectorOrElement, force) {
  const element = getElement(selectorOrElement);

  if (element) {
    if (force === undefined) {
      element.classList.toggle(CSS_CLASSES.HIDDEN);
    } else {
      element.classList.toggle(CSS_CLASSES.HIDDEN, !force);
    }
  }
}

export function getElement(selectorOrElement) {
  if (!selectorOrElement) return;

  const isString = (typeof selectorOrElement === 'string');
  
  return isString ? document.querySelector(selectorOrElement) : selectorOrElement;
}

export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
}

export function showError(message, isHtml = false) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'bottomRight',
    titleColor: 'white',
    messageColor: 'white',
    backgroundColor: 'red',
    messageHtml: isHtml,
  });
}

export function showOrderSuccess(orderNum) {
  Swal.fire({
    icon: 'success',
    title: 'Готово!',
    html: `${STRINGS.NOTIFY_OREDER_RECEIVED} ${orderNum || '---'}`,
    confirmButtonText: 'У Р А',
    customClass: {
      popup: 'dialog-alert-background',
      title: 'dialog-alert-title',
      htmlContainer: 'dialog-alert-html',
      confirmButton: 'button-secondary dialog-alert-confirm-button',
    },
  })
}

export function showLoader(selectorOrElement) {
  const element = getElement(selectorOrElement);
  if (element) {
    element.classList.toggle(CSS_CLASSES.IS_OPEN, true);
  }
}

export function hideLoader(selectorOrElement) {
  const element = getElement(selectorOrElement);
  if (element) {
    element.classList.toggle(CSS_CLASSES.IS_OPEN, false);
  }
}