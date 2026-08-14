import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import { getSvgIconUrl } from './helper.js';
import faqData from './faq-data.js';

document.addEventListener('DOMContentLoaded', () => {
  const ac_container = document.querySelector('.accordion-container');

  if (!ac_container) return;

  const markup = faqData.faq.map(({ order_no, question, answer }) => `
      <li class="ac faq-item">
        <h3 class="ac-header faq-subtitle">
          <button class="ac-trigger faq-button" type="button">
            <span>${order_no}. ${question}</span>
            <svg class="faq-icon">
              <use href="${getSvgIconUrl('../img/icons.svg', 'keyboard-arrow-down')}"></use>
            </svg>
          </button>
        </h3>
        <div class="ac-panel faq-panel">
          <p class="ac-text faq-text">${answer}</p>
        </div>
      </li>
    `
  ).join('');

  ac_container.innerHTML = markup;

  new Accordion('.accordion-container', {
    duration: 400,
    showMultiple: false,
    onOpen: function (element) {
      console.log(element);
    }
  });

})