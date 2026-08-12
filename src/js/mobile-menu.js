(() => {
  const refs = {
    openModalButton: document.querySelector('[data-mobile-menu-open]'),
    closeModalButtons: document.querySelectorAll('[data-mobile-menu-close]'),
    mobileMenu: document.querySelector('[data-mobile-menu]'),
  };

  refs.openModalButton.addEventListener('click', toggleModal);

  refs.closeModalButtons.forEach(button => {
    button.addEventListener('click', toggleModal);
  });

  function toggleModal() {
    if (!refs.mobileMenu) return;

    refs.mobileMenu.classList.toggle('is-open');

    bindKeyboardEvents();
  }

  function mobileIsOpen() {
    return refs.mobileMenu.classList.contains('is-open');
  }

  function bindKeyboardEvents() {
    if (mobileIsOpen()) {
      document.addEventListener('keydown', mobileKeyDown);
    } else {
      document.removeEventListener('keydown', mobileKeyDown);
    }
  }

  function mobileKeyDown(event) {
    if ((event.key === 'Escape') && mobileIsOpen()) {
      toggleModal();
    }
  }
})();
