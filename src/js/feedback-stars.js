import spriteUrl from '../img/star-rating.icons.svg';

export function buildStarRatingMarkup(rate) {

  const { rateIntValue, rateIsHalf } = rateNormalize(rate);
  const halfClass = rateIsHalf ? 'half' : '';

  const starMarkup = getStarMarkup();

  const starsMarkup = Array.from({ length: 5 }, () => { return starMarkup; }).join('');

  return `
    <div class="rating star-svg value-${rateIntValue} ${halfClass} color-default feedback-star-wrapper">
      <div class="star-container">${starsMarkup}</div>
    </div>`;
}

export function buildStarRatingEmptyMarkup(rate) {
  return '';
}

function getStarMarkup() {
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
