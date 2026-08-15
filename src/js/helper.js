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

function getElement(selectorOrElement) {
  if (!selectorOrElement) return;

  const isString = (typeof selectorOrElement === 'string');
  
  return isString ? document.querySelector(selectorOrElement) : selectorOrElement;
}
/*
export function getSvgIconUrl(iconFileName, iconId) {
  if (!iconFileName || (typeof iconFileName !== 'string') ||
      !iconId || (typeof iconId !== 'string')) return;

  const spriteUrl = new URL(iconFileName, import.meta.url).href;

  return `${spriteUrl}#${iconId}`;
}
*/