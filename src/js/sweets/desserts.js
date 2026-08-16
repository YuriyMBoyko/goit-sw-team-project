import { ITEMS_PER_PAGE, refs, state } from './sweets-consts.js';
import spriteUrl from '../../img/icons.svg';
import { setElementVisible } from '../helper.js';
import { fetchDessertsByCategory } from './desserts-data.js';

document.addEventListener('DOMContentLoaded', () => {
  loadDessertsByCategory();

  refs.loadMoreButton.addEventListener('click', handleLoadMoreButtonClick);
});

export async function loadDessertsByCategory(category = '', page = 1) {
  if (state.loading) {
    if (state.clickedCategoryId.toLowerCase() !== category.toLowerCase()) return;
    
    setTimeout(() => {loadDessertsByCategory(category, page)}, 100);
  } else {
    state.loading = true;
    try {
      hideLoadMoreButton();

      if (page === 1) clearDesserts();

      state.currentCategory = category;

      const desserts = await fetchDessertsByCategory(state.currentCategory, page, ITEMS_PER_PAGE);

      if (state.clickedCategoryId.toLowerCase() !== state.currentCategory.toLowerCase()) return;

      handleDessertsData(desserts, page);
    } catch(error) {
      console.error(error);

//      if (page === 1) {
//        clearProducts();
//      }

//      showError(MESSAGES.ERROR_LOADING_PRODUCTS + '<br><br>' + error, true);
    } finally {
      state.loading = false;
//      hideLoader(refs.loader);
    }
  }
}

export async function clearDesserts() {
  if (refs.productList) refs.productList.innerHTML= '';
}

function handleDessertsData(data, page = 1) {
  const items = data?.desserts || [];
  const totalItems = data?.totalItems || 0;
  const limit = data?.limit || ITEMS_PER_PAGE;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  state.currentPage = page;
  if ((page === 1) && (items.length === 0)) {
//    showNotFound(refs.notFound);
//    showInfo(MESSAGES.INFO_NO_PRODUCTS_FOUND);
    return;
  }

  renderDessertsData('.sweets-list', items, (page !== 1));

//  let newProducts;
//  if (page === 1) {
//    newProducts = refs.productsList.querySelectorAll('.sweets-item');
//  } else {
//    const currentCount = refs.productsList.children.length;
//    const allProducts = refs.productsList.querySelectorAll('.sweets-item');
//    newProducts = Array.from(allProducts).slice(currentCount);
//  }

  if ((page >= totalPages) || (items.length < ITEMS_PER_PAGE)) {
//    hideLoadMoreBtn(refs.loadMoreBtn);

    if (page > 1) {
      console.log('No more desserts');
//      showInfo(MESSAGES.INFO_END_OF_PRODUCTS_LIST);
    }
  } else {
    showLoadMoreButton();
  }
}

function renderDessertsData(selectorOrElement, data, append = false) {
  if (!selectorOrElement) return;

  const isString = (typeof selectorOrElement === 'string');
  const desserts_container = isString ? document.querySelector(selectorOrElement) : selectorOrElement;
  if (!desserts_container) return;

  const markup = createDessertsMarkup(data) || '';
  if (markup === '') return;

  if (append) {
    desserts_container.insertAdjacentHTML('beforeend', markup);
  } else {
    desserts_container.innerHTML = markup;
  }
}

function createDessertsMarkup(data) {
  if (!data || !Array.isArray(data)) return '';

  return data.map(({ _id, name, description, price, category, image }) => `
    <li class="sweets-item" data-id="${_id}">
      <img class="sweets-item-image" src="${image}" alt="${name}"/>
      <div class="sweets-item-content">
        <div class="sweets-item-info" >
          <p class="sweets-item-category">${category.name}</p>
          <div class="sweets-item-description-wrapper">
            <h3 class="sweets-item-title">${name}</h3>
            <p class="sweets-item-description">${description}</p>
          </div>
        </div>
        <div class="sweets-item-price-wrapper">
          <p class="sweets-item-price">${price} грн</p>
          <button class="button-secondary-icon sweets-item-open-details-button" type="button" data-id="${_id}" aria-label="Відкрити детальну інформацію">
            <svg class="sweets-item-open-details-button-icon">
              <use href="${spriteUrl}#arrow-outward"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `).join('');
}

async function handleLoadMoreButtonClick(event) {
  try {
    event.currentTarget.blur();
    await loadDessertsByCategory(state.currentCategory, state.currentPage + 1);
  } catch(error) {
    console.log(error)
    showError(MESSAGES.ERROR_LOADING_PRODUCTS);
  }
}

function hideLoadMoreButton() {
  if (refs.loadMoreButton) {
    setElementVisible(refs.loadMoreButton, false);
  }
}

function showLoadMoreButton() {
  if (refs.loadMoreButton) {
    setElementVisible(refs.loadMoreButton, true);
  }
}
