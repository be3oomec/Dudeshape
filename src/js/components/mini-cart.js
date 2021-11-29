
const cartBtn = document.querySelector('.header__btn--cart');
const cartClose = document.querySelector('.mini-cart__close');
const miniCart = document.querySelector('.mini-cart');

cartBtn.addEventListener('click', () => {
  miniCart.classList.toggle('mini-cart--visible');
  document.body.classList.toggle('lock');
});

cartClose.addEventListener('click', () => {
  miniCart.classList.remove('mini-cart--visible');
  document.body.classList.remove('lock');
});