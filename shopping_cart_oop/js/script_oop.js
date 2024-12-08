const runApp = () => {
  const cart = new ShoppingCart();
  cart.products = products;
  cart.displayProducts();

  document.querySelector('button.clear').addEventListener('click', () => cart.clear())
}

runApp();