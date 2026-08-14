import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
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
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 24,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 24 },
      },
      navigation: {
        nextEl: '.about-btn--next',
        prevEl: '.about-btn--prev',
      },
      pagination: {
        el: '.about-pagination',
        clickable: true,
      },
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
