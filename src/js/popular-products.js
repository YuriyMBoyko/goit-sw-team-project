import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getPopularDesserts } from './api.js';
import { showLoader, hideLoader, showError, toggleElementVisibility } from './helpers.js';
import { STRINGS } from './consts.js';
import { openProductModal } from './sweets/product-modal.js';
import { createDessertsMarkup } from './sweets/desserts.js';

const refs = {
  section: document.querySelector('.popular-products'),
  list: document.querySelector('.popular-products-list'),
  popularProductsLoader: document.querySelector('.popular-products-loader-container'),
};

let popularSwiper = null;

document.addEventListener('DOMContentLoaded', initPopularProducts);

function initPopularProducts() {
  if (!refs.section || !refs.list) return;

  loadPopularProducts();

  refs.list.addEventListener('click', handleProductClick);
}

async function loadPopularProducts() {
  let isLoaded = true;
  try {
    showLoader(refs.popularProductsLoader);
    const data = await getPopularDesserts(1, 10);

    const desserts = data?.desserts || [];

    if (desserts.length < 3) {
      throw new Error(
        'Недостатньо популярних товарів для відображення.'
      );
    }

    refs.list.innerHTML = createDessertsMarkup(desserts, {
      swiperSlide: true,
    });

    initPopularSwiper();
  } catch (error) {
    console.error(error);

    showError(
      `${STRINGS.ERROR_LOAD_PRODUCTS}<br/><br/>${
        error.message || error
      }`,
      true
    );
    isLoaded = false;
  } finally {
    hideLoader(refs.popularProductsLoader);
    toggleElementVisibility('.popular-products-pagination-navigation-wrapper', isLoaded);
  }
}

function initPopularSwiper() {
  popularSwiper = new Swiper('.popular-products-slider', {
    modules: [Navigation, Pagination, Keyboard],

    direction: 'horizontal',
    loop: false,

    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,

    simulateTouch: true,
    watchOverflow: true,

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },

      1440: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },

    navigation: {
      prevEl: '.popular-products-button-prev',
      nextEl: '.popular-products-button-next',
    },

    pagination: {
      el: '.popular-products-pagination',
      type: 'bullets',
      clickable: true,

/*      dynamicBullets: true,*/
/*      dynamicMainBullets: 3,*/
      
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: false,
    },
  });
}

function handleProductClick(event) {
  const button = event.target.closest(
    '.sweets-item-open-details-button'
  );

  if (!button) return;

  openProductModal(button.dataset.id);
}