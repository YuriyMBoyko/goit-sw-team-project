import { CSS_CLASSES, STRINGS } from '../consts.js';
import { CLASS_NAMES, ALL_CATEGORIES, refs, state } from './sweets-consts.js';
import { clearDesserts, loadDessertsByCategory } from './desserts.js';
import { showLoader, hideLoader, showError, escapeHtml } from '../helpers.js';
import { fetchCategories } from '../api.js';
/*import { fetchCategories } from './categories-data.js';*/

document.addEventListener('DOMContentLoaded', () => {
  if (!refs.categoryList) return;

  loadCategories();

  refs.categoryList.addEventListener('click', handleCategoryClick);
  refs.categoryDropDown.addEventListener('click', handleCategoryDropdownClick);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
});

async function loadCategories() {
  if (state.loading) {
    setTimeout(() => { loadCategories(); }, 100);
    return;
  }

  try {
    state.loading = true;
    showLoader(refs.categoryLoader);
  
    renderCategories();
    clearDesserts();

    var categories = await fetchCategories();
    categories = [ALL_CATEGORIES, ...categories];
    renderCategories(categories);

    const firstBtn = refs.categoryList.querySelector(`.${CLASS_NAMES.CATEGORY_BUTTON}`);
    if (firstBtn) {
      firstBtn.classList.add(CSS_CLASSES.IS_ACTIVE);
      setDropdownName(firstBtn.dataset.categoryName);
    }

    state.clickedCategoryId = firstBtn?.dataset.categoryId;
    await loadDessertsByCategory(state.clickedCategoryId || '', 1);

/*    initProductModal(refs.productsList);*/
  } catch(error) {
    console.log(error);
    showError(`${STRINGS.ERROR_LOAD_CATEGORIES}<br/><br/>${error}`);
  } finally {
    hideLoader(refs.categoryLoader);
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
  if (!clicked || !clicked.classList.contains(CLASS_NAMES.CATEGORY_BUTTON) || clicked.classList.contains(CSS_CLASSES.IS_ACTIVE)) return;

  document.querySelector(`.${CLASS_NAMES.CATEGORY_BUTTON}.${CSS_CLASSES.IS_ACTIVE}`)?.classList.remove(CSS_CLASSES.IS_ACTIVE);

  setDropdownOpen(false);
  setDropdownName(clicked.dataset.categoryName);

  clicked.classList.add(CSS_CLASSES.IS_ACTIVE);
  clicked.blur();
  setTimeout(() => {
    state.clickedCategoryId = clicked.dataset.categoryId;
    loadDessertsByCategory(state.clickedCategoryId || '');
  }, 10);
}

function handleCategoryDropdownClick(event) {
  const clicked = event.currentTarget;
  if (!clicked || !clicked.classList.contains(CLASS_NAMES.CATEGORY_DROPDOWN)) return;

  clicked.classList.toggle(CSS_CLASSES.IS_OPEN);
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
    refs.categoryDropDown.classList.toggle(CSS_CLASSES.IS_OPEN, isOpen);
  }
}

function dropdownIsOpen() {
  return refs.categoryDropDown ? refs.categoryDropDown.classList.contains(CSS_CLASSES.IS_OPEN) : false;
}

function setDropdownName(value) {
  if (refs.categoryDropDownName) {
    refs.categoryDropDownName.innerHTML = (typeof value === 'string') ? String(value) : '';
  }
}
