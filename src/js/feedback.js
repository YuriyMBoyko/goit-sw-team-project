import feedbackData from './feedback-data.js';

document.addEventListener('DOMContentLoaded', () => {
  markupFeedbackData('.feedback-data-container', feedbackData.feedbacks);
});

function markupFeedbackData(selectorOrElement, data) {

  if (!selectorOrElement || !data || !Array.isArray(data)) return;

  const isString = (typeof selectorOrElement === 'string');
  
  const feedback_container = isString ? document.querySelector(selectorOrElement) : selectorOrElement;

  if (!feedback_container) return;

  const markup = data.map(({ _id, rate, description, author }) => `
    <li class="feedback-item" data_id="${_id}">
      <div class="feedback-rating" data-rate="${rate}">
        <div class="feedback-star-wrapper">
          <svg class="feedback-star is-marked">
            <use href="./img/icons.svg#instagram"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="./img/icons.svg#instagram"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="./img/icons.svg#instagram"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="./img/icons.svg#instagram"></use>
          </svg>
          <svg class="feedback-star">
            <use href="./img/icons.svg#instagram"></use>
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
