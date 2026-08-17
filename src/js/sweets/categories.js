import { CLASS_NAMES, ALL_CATEGORIES, refs, state } from './sweets-consts.js';
import { clearDesserts, loadDessertsByCategory } from './desserts.js';
import { escapeHtml } from '../helpers.js';
import categoriesData, { fetchCategories } from './categories-data.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!refs.categoryList) return;

  loadCategories();

  refs.categoryList.addEventListener('click', handleCategoryClick);
  refs.categoryDropDown.addEventListener('click', handleCategoryDropdownClick);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  /*
  refs.loadMoreButton.addEventListener('click', () => loadDeserts());
  refs.categoryList.addEventListener('click', onCategoryListClick);
  refs.dessertList.addEventListener('click', onDessertListClick);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
*/
});

async function loadCategories() {
  if (state.loading) {
    setTimeout(() => { loadCategories(); }, 100);
  }

  try {
    state.loading = true;
    renderCategories();
    clearDesserts();

    var categories = await fetchCategories();
    categories = [ALL_CATEGORIES, ...categories];
    renderCategories(categories);

    const firstBtn = refs.categoryList.querySelector(`.${CLASS_NAMES.CATEGORY_BUTTON}`);
    if (firstBtn) {
      firstBtn.classList.add(CLASS_NAMES.IS_ACTIVE);
      setDropdownName(firstBtn.dataset.categoryName);
    }

    state.clickedCategoryId = firstBtn?.dataset.categoryId;
    await loadDessertsByCategory(state.clickedCategoryId || '', 1);

/*    initProductModal(refs.productsList);*/
  } catch(error) {
    console.log(error);
  } finally {
    state.loading = false;
  }
}

function renderCategories(categories = []) {
  if (!categories) return;

  refs.categoryList.innerHTML = createCategoryMarkup(categories);
}

function createCategoryMarkup(categories) {
  if (!categories || !Array.isArray(categories)) return '';

  return categories.map(({ _id, name }) => {
    return `
      <li class="${CLASS_NAMES.CATEGORY_ITEM}">
        <button class="button-secondary ${CLASS_NAMES.CATEGORY_BUTTON}" type="button" data-category-id="${escapeHtml(_id)}" data-category-name="${escapeHtml(name)}">${escapeHtml(name)}</button>
      </li>`;
  }).join('');
}

async function handleCategoryClick(event) {
  const clicked = event.target;  
  if (!clicked || !clicked.classList.contains(CLASS_NAMES.CATEGORY_BUTTON) || clicked.classList.contains(CLASS_NAMES.IS_ACTIVE)) return;

  document.querySelector(`.${CLASS_NAMES.CATEGORY_BUTTON}.${CLASS_NAMES.IS_ACTIVE}`)?.classList.remove(CLASS_NAMES.IS_ACTIVE);

  setDropdownOpen(false);
  setDropdownName(clicked.dataset.categoryName);

  clicked.classList.add(CLASS_NAMES.IS_ACTIVE);
  clicked.blur();
  setTimeout(() => {
    state.clickedCategoryId = clicked.dataset.categoryId;
    loadDessertsByCategory(state.clickedCategoryId || '');
  }, 10);
}

function handleCategoryDropdownClick(event) {
  const clicked = event.currentTarget;
  if (!clicked || !clicked.classList.contains(CLASS_NAMES.CATEGORY_DROPDOWN)) return;

  clicked.classList.toggle(CLASS_NAMES.IS_OPEN);
}

function onDocumentClick(event) {
  if (dropdownIsOpen() && !refs.categoryDropDown.contains(event.target)) {
    setDropdownOpen(false);
  }
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape' && dropdownIsOpen()) {
    setDropdownOpen(false);
  }
}

function setDropdownOpen(isOpen) {
  if (refs.categoryDropDown) {
    refs.categoryDropDown.classList.toggle('is-open', isOpen);
  }
}

function dropdownIsOpen() {
  return refs.categoryDropDown ? refs.categoryDropDown.classList.contains(CLASS_NAMES.IS_OPEN) : false;
}

function setDropdownName(value) {
  if (refs.categoryDropDownName) {
    refs.categoryDropDownName.innerHTML = (typeof value === 'string') ? String(value) : '';
  }
}