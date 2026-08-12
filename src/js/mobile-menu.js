(() => {
  const refs = {
    openModalButton: document.querySelector('[data-mobile-menu-open]'),
    closeModalButtons: document.querySelectorAll('[data-mobile-menu-close]'),
    modal: document.querySelector('[data-mobile-menu]'),
  };

  refs.openModalButton.addEventListener('click', toggleModal);

  refs.closeModalButtons.forEach(button => {
    button.addEventListener('click', toggleModal);
  });

  function toggleModal() {
    refs.modal.classList.toggle('is-open');
  }
})();
