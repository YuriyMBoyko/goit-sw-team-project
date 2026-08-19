export const ITEMS_PER_PAGE = 8;

export const CLASS_NAMES = {
  CATEGORY_ITEM: 'sweets-category-item',
  CATEGORY_BUTTON: 'sweets-category-button',
  CATEGORY_DROPDOWN: 'sweets-category-dropdown',
  PRODUCT_OPEN_DETAIL: 'sweets-item-open-details-button',
}

export const ALL_CATEGORIES = Object.freeze({ _id: '', name: 'Всі десерти' });

export const refs = {
  sweetsContainer: document.querySelector('.sweets-container'),
  categoryList: document.querySelector('.sweets-category-list'),
  categoryDropDown: document.querySelector(`.${CLASS_NAMES.CATEGORY_DROPDOWN}`),
  categoryDropDownName: document.querySelector('.sweets-category-name'),
  productList: document.querySelector('.sweets-list'),
  loadMoreButton: document.querySelector('.sweets-load-more-button'),
  categoryLoader: document.querySelector('#category-loader'),
  productLoader: document.querySelector('#product-loader'),
}

export const state = {
  currentCategory: '',
  clickedCategoryId: '',
  currentPage: 1,
  loading: false,
}
