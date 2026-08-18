import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import Swal from 'sweetalert2';
import { CSS_CLASSES, STRINGS } from './consts.js';

export function toggleElementVisible(selectorOrElement) {
  const element = getElement(selectorOrElement);

  if (element) {
    element.classList.toggle('hidden');
  }
}

export function setElementVisible(selectorOrElement, visible) {
  const element = getElement(selectorOrElement);

  if (element) {
    if (visible) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
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
    title: 'Успіх',
    text: `${STRINGS.NOTIFY_OREDER_RECEIVED} ${orderNum || '---'}`,
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