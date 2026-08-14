import { getSvgIconUrl } from './helper.js';
import feedbackData from './feedback-data.js';

document.addEventListener('DOMContentLoaded', () => {
  markupFeedbackData('.feedback-data-container', feedbackData.feedbacks);
});

function markupFeedbackData(selectorOrElement, data) {

  if (!selectorOrElement || !data || !Array.isArray(data)) return;

  const isString = (typeof selectorOrElement === 'string');
  
  const feedback_container = isString ? document.querySelector(selectorOrElement) : selectorOrElement;

  if (!feedback_container) return;

  const spriteUrl = getSvgIconUrl('../img/icons.svg', 'instagram');
  console.log(`This is spriteUrl from feedback section: ${spriteUrl}`);

  const markup = data.map(({ _id, rate, description, author }) => `
    <li class="feedback-item" data_id="${_id}">
      <div class="feedback-rating" data-rate="${rate}">
        <div class="feedback-star-wrapper">
          <svg class="feedback-star is-marked">
            <use href="${spriteUrl}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${spriteUrl}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${spriteUrl}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${spriteUrl}"></use>
          </svg>
          <svg class="feedback-star">
            <use href="${spriteUrl}"></use>
          </svg>
        </div>
      </div>
      <p class="feedback-text">${description}</p>
      <p class="feedback-author">${author}</p>
    </li>
    `
  ).join('');

  feedback_container.innerHTML = markup;
}
