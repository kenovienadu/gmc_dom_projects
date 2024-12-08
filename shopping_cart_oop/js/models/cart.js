class ShoppingCart {
  constructor() {
    this.products = [];
    this.items = [];
    this.cartTotal = 0;
  }

  addCartItem(product) {
    const cartItem = new CartItem(product.id, 1, product.price);
    this.items.push(cartItem);
    this.displayCartTotal();
  }

  removeCartItem(id = '') {
    this.items = this.items.filter(item => item.productId !== id);
    this.displayCartTotal();
  }

  itemIsInCart(id = '') {
    return this.items.some(item => item.productId === id);
  }

  displayCartTotal() {
    let total = 0;
    this.items.forEach(item => total += item.totalPrice());
    this.cartTotal = total;
    document.querySelector('#total').textContent = this.cartTotal;
  }

  displayCartItems() {
    // logic goes here
  }

  displayProducts() {
    if (!this.products.length) {
      return;
    }

    const wrapper = document.querySelector('.products-grid');
    if (!wrapper) {
      return;
    }

    const existingElements = document.querySelectorAll('.product-outer');
    existingElements.forEach(el => el.remove());

    this.products.forEach(product => {
      const itemIsInCart = this.itemIsInCart(product.id);

      const productCard = document.createElement('section');
      productCard.setAttribute('id', product.id);
      productCard.setAttribute('class', 'product-outer');

      productCard.innerHTML = `
        <div class="product">
          <img class="w-full h-[200px] object-contain" src="https://res.cloudinary.com/dk07kf3yl/image/upload/c_thumb,w_200,g_face/v1733673243/temp/item-placeholder_pr2sx5.webp" alt="">
          <div class="bg-gray-100 p-3">
            <div class="flex justify-between h-[50px]">
              <div>${product.name}</div>
              <div>$${product.price}</div>
            </div>
            <div class="mt-3">
              <button class="bg-gray-700 text-white text-xs p-2 rounded">
                ${itemIsInCart ? 'Remove From Cart' : 'Add To Cart'}
              </button>
            </div>
          </div>
        </div>
      `;

      productCard.querySelector('button')?.addEventListener('click', (event) => {
        const button = event.currentTarget;
        const inCart = this.itemIsInCart(product.id);
        inCart ? this.removeCartItem(product.id) : this.addCartItem(product);
        button.textContent = inCart ? 'Add To Cart' : 'Remove From Cart';
      })

      wrapper.appendChild(productCard);
    })
  }

  clear() {
    this.items = [];
    this.displayProducts();
    this.displayCartTotal();
  }
}