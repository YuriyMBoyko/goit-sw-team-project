import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'css-star-rating/css/star-rating.css';
import { STRINGS } from './consts.js';
import { showLoader, hideLoader, showError } from './helpers.js';
import { fetchFeedbacks } from './api.js';
import spriteUrl from '../img/star-rating.icons.svg';
/*import { buildStarRatingMarkup } from './feedback-stars.js';*/
/*import { fetchFeedbacks } from './feedback-data.js';*/

const refs = {
  feedbackContainer: document.querySelector('.feedback-data-container'),
  feedbackLoader: document.querySelector('.feedback-loader-container'),
}

const state = {
  loading: false,
}

document.addEventListener('DOMContentLoaded', () => {
  initFeedbacks();
});

function initFeedbacks(lazyLoad = true) {
  if (!lazyLoad || (!'IntersectionObserver' in window)) {
    loadFeedbacks();

    initFeedbackSwiper();
  } else {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => { initFeedbacks(false); }, 100);
          observer.unobserve(entry.target);
        }
      })
    }, {
      rootMargin: '20px',
    });

    observer.observe(refs.feedbackContainer);
  }
}

async function loadFeedbacks() {
  if (state.loading) {
    setTimeout(() => { loadFeedbacks(); }, 100);
    return;
  }

  try {
    state.loading = true;
    showLoader(refs.feedbackLoader);

    const data = await fetchFeedbacks();
    if (!data || (data.length < 3)){
      showError(STRINGS.ERROR_NOT_ENOUGH_FEEDBACKS);
    } else {
      renderFeedbacks(data?.feedbacks || []);
    }
  } catch(error) {
    console.log(error);
    showError(`${STRINGS.ERROR_LOAD_FEEDBACKS}<br/><br/>${error}`);
  } finally {
    state.loading = false;
    hideLoader(refs.feedbackLoader);
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
  const feedbackSwiper = new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination, Keyboard],
    direction: 'horizontal',
    loop: false,
    simulateTouch: true,

    slidesPerView: 1,
    spaceBetween: 24,

    breakpoints: {
      768: {
        slidesPerView: 3, 
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
/*      
      dynamicBullets: true,
      dynamicMainBullets: 6,
*/      
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: false,
    }
  });
}

function buildStarRatingMarkup(rate) {

  const { rateIntValue, rateIsHalf } = rateNormalize(rate);
  const halfClass = rateIsHalf ? 'half' : '';

  const starMarkup = getStarMarkup();

  const starsMarkup = Array.from({ length: 5 }, () => { return starMarkup; }).join('');

  return `
    <div class="rating star-svg value-${rateIntValue} ${halfClass} color-default feedback-star-wrapper">
      <div class="star-container">${starsMarkup}</div>
    </div>`;
}

function buildStarRatingEmptyMarkup(rate) {
  return '';
}

function getStarMarkup() {
  console.log(spriteUrl);
  return `
    <div class="star">
      <svg class="star-empty"><use href="${spriteUrl}#star-empty"></use></svg>
      <svg class="star-half"><use href="${spriteUrl}#star-half"></use></svg>
      <svg class="star-filled"><use href="${spriteUrl}#star-filled"></use></svg>
    </div>`;
}

function rateNormalize(value) {
  const rate = Math.round(10 * Math.max(0, (Math.min(5, Number(value) || 0))));
  return {
    rateValue: rate / 10,
    rateIntValue: Math.floor(rate / 10),
    rateIsHalf: (rate % 10) >= 5
  };
}
