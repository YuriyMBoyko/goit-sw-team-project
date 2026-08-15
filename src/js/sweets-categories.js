import categoriesFallback from './sweets/categories-data.js';
import dessertsFallback from './sweets/desserts-data.js';

const spriteUrl = new URL('../img/icons.svg', import.meta.url).href;

const refs = {
  categoryList: document.querySelector('.sweets-category-list'),
  dessertList: document.querySelector('.sweets-list'),
  loadMoreButton: document.querySelector('.sweets-load-more-button'),
};

const ALL_CATEGORIES = Object.freeze({ _id: '', name: 'Всі десерти' });
const BASE_LIMIT = 8;

const state = {
  categories: [ALL_CATEGORIES],
  activeCategory: { ...ALL_CATEGORIES },
  page: 1,
  totalItems: null,
  loadedIds: new Set(),
  itemsById: new Map(),
  loading: false,
};

let useFallback = false;

document.addEventListener('DOMContentLoaded', () => {
  if (!refs.categoryList || !refs.dessertList || !refs.loadMoreButton) return;

  loadCategories();
  loadDeserts({ reset: true });

  refs.loadMoreButton.addEventListener('click', () => loadDeserts());
  refs.categoryList.addEventListener('click', onCategoryListClick);
  refs.dessertList.addEventListener('click', onDessertListClick);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
});

function loadCategories() {
  fetch('/categories')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      const items = Array.isArray(data) ? data : data.categories;
      if (!Array.isArray(items)) throw new Error('Invalid categories');
      state.categories = [ALL_CATEGORIES, ...items];
      useFallback = false;
    })
    .catch(() => {
      useFallback = true;
      const items = Array.isArray(categoriesFallback) ? categoriesFallback : [];
      state.categories = [ALL_CATEGORIES, ...items];
    })
    .finally(() => renderCategoryControls());
}

async function loadDeserts({ reset = false } = {}) {
  if (state.loading) return;
  state.loading = true;

  const categoryId = state.activeCategory._id;
  const categoryName = state.activeCategory.name;
  const page = reset ? 1 : state.page;

  try {
    let result = await requestDeserts({ categoryName, page });

    if (!result.items.length && categoryId) {
      result = await requestDeserts({ categoryId, page });
    }

    const fresh = result.items.filter(item => !state.loadedIds.has(item._id));

    fresh.forEach(item => {
      state.loadedIds.add(item._id);
      state.itemsById.set(item._id, item);
    });

    if (reset) {
      refs.dessertList.innerHTML = '';
    }

    state.totalItems = result.total;
    state.page += 1;

    refs.dessertList.insertAdjacentHTML('beforeend', buildCardsMarkup(fresh));

    const reachedEnd =
      fresh.length < BASE_LIMIT ||
      (state.totalItems !== null && state.loadedIds.size >= state.totalItems);

    updateLoadMoreButton(!reachedEnd);
  } catch (error) {
    if (reset) {
      refs.dessertList.innerHTML =
        '<li class="sweets-item sweets-error-message">Не вдалося завантажити десерти.</li>';
    }
    updateLoadMoreButton(false);
  } finally {
    state.loading = false;
  }
}

async function requestDeserts({ categoryName = '', categoryId = '', page = 1, limit = BASE_LIMIT } = {}) {
  if (useFallback) {
    return requestDesertsFromMock({ categoryName, categoryId, page, limit });
  }

  try {
    const params = new URLSearchParams({ page, limit });

    if (categoryName) params.set('category', categoryName);
    if (categoryId) params.set('categoryId', categoryId);

    const response = await fetch(`/deserts?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const result = normalizeDesertsResponse(data);
    if (!result.items.length) throw new Error('Empty response');

    useFallback = false;
    return result;
  } catch (error) {
    useFallback = true;
    return requestDesertsFromMock({ categoryName, categoryId, page, limit });
  }
}

function requestDesertsFromMock({ categoryName = '', categoryId = '', page = 1, limit = BASE_LIMIT } = {}) {
  const source = dessertsFallback && Array.isArray(dessertsFallback.desserts)
    ? dessertsFallback.desserts
    : dessertsFallback;

  let items = Array.isArray(source) ? source : [];

  let filterName = categoryName;
  if (!filterName && categoryId) {
    const found = state.categories.find(category => category._id === categoryId);
    if (found) filterName = found.name;
  }

  if (filterName) {
    items = items.filter(item => item.category && item.category.name === filterName);
  }

  const total = items.length;
  const start = (page - 1) * limit;

  return Promise.resolve({ items: items.slice(start, start + limit), total });
}

function normalizeDesertsResponse(data) {
  if (Array.isArray(data)) return { items: data, total: data.length };

  const source = data && typeof data === 'object' ? data : {};
  const items = Array.isArray(source.desserts)
    ? source.desserts
    : Array.isArray(source.data)
      ? source.data
      : [];

  const total = typeof source.totalItems === 'number' ? source.totalItems : items.length;

  return { items, total };
}

function selectCategory(categoryId, categoryName) {
  state.activeCategory = { _id: categoryId, name: categoryName };
  state.page = 1;
  state.totalItems = null;
  state.loadedIds = new Set();
  state.itemsById = new Map();

  renderCategoryControls();
  loadDeserts({ reset: true });
}

function renderCategoryControls() {
  renderDesktopCategories();
  renderDropdownCategories();
}

function renderDesktopCategories() {
  refs.categoryList.innerHTML = state.categories
    .map(({ _id, name }) => {
      const isActive = _id === state.activeCategory._id;

      return `
        <li class="sweets-category-item">
          <button
            type="button"
            class="sweets-category-button${isActive ? ' is-active' : ''}"
            data-category-id="${escapeHtml(_id)}"
            data-category-name="${escapeHtml(name)}">${escapeHtml(name)}</button>
        </li>`;
    })
    .join('');
}

function renderDropdownCategories() {
  const wrapper = ensureDropdown();

  const options = state.categories
    .map(({ _id, name }) => {
      const isActive = _id === state.activeCategory._id;

      return `
        <li class="sweets-dropdown-option">
          <button
            type="button"
            class="${isActive ? 'is-active' : ''}"
            data-category-id="${escapeHtml(_id)}"
            data-category-name="${escapeHtml(name)}">${escapeHtml(name)}</button>
        </li>`;
    })
    .join('');

  wrapper.innerHTML = `
    <button type="button" class="sweets-dropdown-toggle">
      <span class="sweets-dropdown-label">${escapeHtml(state.activeCategory.name)}</span>
      <svg class="sweets-dropdown-arrow" width="20" height="20">
        <use href="${spriteUrl}#keyboard-arrow-down"></use>
      </svg>
    </button>
    <ul class="sweets-dropdown-list">
      ${options}
    </ul>`;
}

function ensureDropdown() {
  const existing = document.querySelector('.sweets-dropdown');
  if (existing) return existing;

  const wrapper = document.createElement('div');
  wrapper.className = 'sweets-dropdown';

  wrapper.addEventListener('click', event => {
    const toggle = event.target.closest('.sweets-dropdown-toggle');
    if (toggle) {
      setDropdownOpen(!dropdownIsOpen());
      return;
    }

    const option = event.target.closest('[data-category-id]');
    if (option) {
      selectCategory(option.dataset.categoryId, option.dataset.categoryName);
      setDropdownOpen(false);
    }
  });

  refs.categoryList.parentNode.insertBefore(wrapper, refs.categoryList);

  return wrapper;
}

function setDropdownOpen(isOpen) {
  const wrapper = document.querySelector('.sweets-dropdown');
  if (!wrapper) return;
  wrapper.classList.toggle('is-open', isOpen);
}

function dropdownIsOpen() {
  const wrapper = document.querySelector('.sweets-dropdown');
  return wrapper ? wrapper.classList.contains('is-open') : false;
}

function onCategoryListClick(event) {
  const button = event.target.closest('[data-category-id]');
  if (!button) return;

  selectCategory(button.dataset.categoryId, button.dataset.categoryName);
}

function onDessertListClick(event) {
  const button = event.target.closest('[data-product-id]');
  if (!button) return;

  const product = state.itemsById.get(button.dataset.productId);
  if (product) openProductModal(product);
}

function onDocumentClick(event) {
  const dropdown = document.querySelector('.sweets-dropdown');
  if (!dropdown || !dropdown.classList.contains('is-open')) return;

  if (!dropdown.contains(event.target)) {
    setDropdownOpen(false);
  }
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape' && dropdownIsOpen()) {
    setDropdownOpen(false);
  }
}

function buildCardsMarkup(items) {
  return items
    .map(item => {
      const categoryName = item.category && item.category.name ? item.category.name : '';

      return `
        <li class="sweets-item" data-id="${item._id}">
          ${item.image ? `<img class="sweets-card-image" src="${item.image}" alt="${escapeHtml(item.name)}" />` : ''}
          <div class="sweets-card-body">
            ${categoryName ? `<p class="sweets-card-category">${escapeHtml(categoryName)}</p>` : ''}
            <h3 class="sweets-card-title">${escapeHtml(item.name)}</h3>
            ${item.description ? `<p class="sweets-card-description">${escapeHtml(item.description)}</p>` : ''}
            <div class="sweets-card-footer">
              <p class="sweets-card-price">${item.price} грн</p>
              <button type="button" class="sweets-card-button" data-product-id="${item._id}">
                <svg width="20" height="20">
                  <use href="${spriteUrl}#arrow-outward"></use>
                </svg>
              </button>
            </div>
          </div>
        </li>`;
    })
    .join('');
}

function openProductModal(product) {
  const backdrop = document.createElement('div');
  backdrop.className = 'sweets-modal-backdrop';

  backdrop.innerHTML = `
    <div class="sweets-modal" role="dialog" aria-modal="true">
      <button type="button" class="sweets-modal-close" data-modal-close>
        <svg width="20" height="20">
          <use href="${spriteUrl}#close"></use>
        </svg>
      </button>
      ${product.image ? `<img class="sweets-modal-image" src="${product.image}" alt="${escapeHtml(product.name)}" />` : ''}
      ${product.category && product.category.name ? `<p class="sweets-modal-category">${escapeHtml(product.category.name)}</p>` : ''}
      <h3 class="sweets-modal-title">${escapeHtml(product.name)}</h3>
      ${product.description ? `<p class="sweets-modal-description">${escapeHtml(product.description)}</p>` : ''}
      ${product.composition ? `<p class="sweets-modal-composition"><strong>Склад:</strong> ${escapeHtml(product.composition)}</p>` : ''}
      ${product.rate ? `<p class="sweets-modal-rate"><strong>Рейтинг:</strong> ${product.rate}</p>` : ''}
      <p class="sweets-modal-price">${product.price} грн</p>
    </div>`;

  document.body.appendChild(backdrop);
  document.body.classList.add('is-modal-open');

  const close = () => {
    backdrop.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', onModalKeydown);
  };

  function onModalKeydown(event) {
    if (event.key === 'Escape') close();
  }

  backdrop.addEventListener('click', event => {
    if (event.target.closest('[data-modal-close]')) close();
    if (event.target === backdrop) close();
  });

  document.addEventListener('keydown', onModalKeydown);
}

function updateLoadMoreButton(show) {
  refs.loadMoreButton.classList.toggle('is-hidden', !show);
}

function escapeHtml(value = '') {
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
