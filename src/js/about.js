import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', () => {
  const aboutSliderEl = document.querySelector('.about-swiper');
  if (!aboutSliderEl) return;

  const desktopMediaQuery = window.matchMedia('(min-width: 768px)');
  let aboutSwiper = null;

  function initAboutSwiper() {
    if (aboutSwiper) return;
    aboutSwiper = new Swiper('.about-swiper', {
      modules: [Navigation, Pagination, Keyboard],
      direction: 'horizontal',
      loop: false,

      slidesPerView: 1,

      breakpoints: {
        768: {
          slidesPerView: 2, 
          spaceBetween: 24
        },
      },
      lazy: true,

      navigation: {
        prevEl: '.about-button-prev',
        nextEl: '.about-button-next',
      },

      pagination: {
        el: '.about-pagination',
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

  function destroyAboutSwiper() {
    if (!aboutSwiper) return;
    aboutSwiper.destroy(true, true);
    aboutSwiper = null;
  }

  function handleBreakpoint(e) {
    e.matches ? initAboutSwiper() : destroyAboutSwiper();
  }

  handleBreakpoint(desktopMediaQuery);
  desktopMediaQuery.addEventListener('change', handleBreakpoint);
});
