import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'css-star-rating/css/star-rating.css';
import { fetchFeedbackData } from './feedback-data.js';
import { buildStarRatingMarkup } from './feedback-stars.js';

const refs = {
  feedbackContainer: document.querySelector('.feedback-data-container'),
}

const state = {
  loading: false,
}

document.addEventListener('DOMContentLoaded', () => {
  loadFeedbacks();

  initFeedbackSwiper();
});

async function loadFeedbacks() {
  if (state.loading) {
    setTimeout(() => { loadFeedbacks(); }, 100);
  }

  try {
    state.loading = true;

    const data = await fetchFeedbackData();
    renderFeedbacks(data?.feedbacks || []);
  } catch(error) {
    console.log(error);
  } finally {
    state.loading = false;
  }
}

function renderFeedbacks(data = []) {
  if (!data) return;

  refs.feedbackContainer.innerHTML = createFeedbackMarkup(data);
}

function createFeedbackMarkup(data = []) {
  if (!data || !Array.isArray(data)) return '';

  return data.map(({ _id, rate, description, author }) => {
    return `
      <li class="swiper-slide feedback-item" data_id="${_id}">
        <div class="feedback-rating" data-rate="${rate}">${buildStarRatingMarkup(rate)}</div>
        <p class="feedback-text">${description}</p>
        <p class="feedback-author">${author}</p>
      </li>`;
  }).join('');
}

function initFeedbackSwiper() {
  const aboutSwiper = new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination, Keyboard],
/*    direction: 'horizontal',*/
    loop: false,

    slidesPerView: 1,
    spaceBetween: 24,
    dynamicBullets: true,
/*    dynamicMainBullets: 3,*/

    breakpoints: {
      768: {
        slidesPerView: 3, 
        spaceBetween: 24
      },
    },

    navigation: {
      prevEl: '.feedback-swiper-button-prev',
      nextEl: '.feedback-swiper-button-next',
    },

    pagination: {
      el: '.feedback-swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: false,
    }
  });
}
