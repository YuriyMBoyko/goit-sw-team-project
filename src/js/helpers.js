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
