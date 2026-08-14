import dessertsData from './desserts-data.js';

const sweetsList = document.querySelector('.sweets-list');
const loadMoreButton = document.querySelector('.sweets-load-more-button');

const ITEMS_PER_PAGE = 8;

let currentPage = 1;

function createDessertMarkup(dessert) {
  return `
    <li class="sweets-item">
      <img
        class="sweets-item-image"
        src="${dessert.image}"
        alt="${dessert.name}"
      />

      <div class="sweets-item-content">
        <p class="sweets-item-category">
          ${dessert.category.name}
        </p>

        <h3 class="sweets-item-title">
          ${dessert.name}
        </h3>

        <p class="sweets-item-description">
          ${dessert.description}
        </p>

        <div class="sweets-item-bottom">
          <p class="sweets-item-price">
            ${dessert.price} грн
          </p>

          <button
            class="sweets-item-button"
            type="button"
            data-id="${dessert._id}"
            aria-label="Відкрити детальну інформацію"
          >
            ↗
          </button>
        </div>
      </div>
    </li>
  `;
}

function renderDesserts() {
  const endIndex = currentPage * ITEMS_PER_PAGE;

  const dessertsToRender = dessertsData.desserts.slice(0, endIndex);

  sweetsList.innerHTML = dessertsToRender.map(createDessertMarkup).join('');

  updateLoadMoreButton();
}

function updateLoadMoreButton() {
  const displayedDesserts = currentPage * ITEMS_PER_PAGE;

  if (displayedDesserts >= dessertsData.desserts.length) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }
}

loadMoreButton.addEventListener('click', () => {
  currentPage += 1;

  renderDesserts();
});

renderDesserts();
