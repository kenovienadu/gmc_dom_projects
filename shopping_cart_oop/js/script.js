const defaultQuantityEl = document.createElement('span');

const products = [
  {
    id: 1,
    name: 'Baskets',
    description: 'This is a basket',
    price: 100,
    cartQuantity: 0,
    imageSrc: "./assets/baskets.png",
    isFavorite: false,
    quantityEl: defaultQuantityEl,
    favoriteEl: defaultQuantityEl,
    deleted: false,
  },
  {
    id: 2,
    name: 'Socks',
    description: 'This is a socks',
    price: 20,
    cartQuantity: 0,
    imageSrc: "./assets/socks.png",
    isFavorite: false,
    quantityEl: defaultQuantityEl,
    favoriteEl: defaultQuantityEl,
    deleted: false,
  },
  {
    id: 3,
    name: 'Bag',
    description: 'This is a bag',
    price: 50,
    cartQuantity: 0,
    imageSrc: "./assets/bag.png",
    isFavorite: false,
    quantityEl: defaultQuantityEl,
    favoriteEl: defaultQuantityEl,
    deleted: false,
  },
]

const updateCartTotal = () => {
  const totalEl = document.querySelector('.total');
  const total = products.filter(item => !item.deleted).reduce((acc, product) => {
    return acc + (product.cartQuantity * product.price);
  }, 0);

  totalEl.textContent = `${total} $`;
}

const increaseCartQuantity = (productId = 1) => {
  const itemIndex = products.findIndex(product => productId === product.id);
  if (itemIndex === -1) return;

  const product = products[itemIndex];
  product.cartQuantity = product.cartQuantity + 1;
  product[itemIndex] = product;

  product.quantityEl.innerText = product.cartQuantity;
  updateCartTotal();
}

const decreaseCartQuantity = (productId = 1) => {
  const itemIndex = products.findIndex(product => productId === product.id);
  if (itemIndex === -1) return;
  const product = products[itemIndex];

  if (!product.cartQuantity) return;
  product.cartQuantity = product.cartQuantity - 1;
  product[itemIndex] = product;

  product.quantityEl.innerText = product.cartQuantity;
  updateCartTotal();
}

const deleteCartItem = (productId = 1) => {
  const itemIndex = products.findIndex(product => productId === product.id);
  if (itemIndex === -1) return;
  const product = products[itemIndex];

  products[itemIndex] = {
    ...product,
    deleted: true,
    cartQuantity: 0
  };

  updateCartTotal();
  renderProductItems()
}

const toggleFavorite = (productId = 1) => {
  const itemIndex = products.findIndex(product => productId === product.id);
  if (itemIndex === -1) return;
  const product = products[itemIndex];

  product.isFavorite = !product.isFavorite;
  product[itemIndex] = product;

  product.favoriteEl.style.color = product.isFavorite ? 'red' : 'lightgray';
}

const renderProductItems = () => {
  const productListEl = document.querySelector('.list-products');
  if (!productListEl) {
    console.error('no products wrapper found')
    return;
  }

  const productCards = [];
  products.filter(product => !product.deleted).forEach(product => {
    const productDiv = document.createElement('div');

    productDiv.innerHTML = `
      <div id="${product.name.toLowerCase()}" class="card-body">
        <div class="card" style="width: 18rem">
          <img
            src="${product.imageSrc}"
            class="card-img-top"
            alt="baskets"
          />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <h4 class="unit-price">${product.price} $</h4>
            <div>
              <i class="fas fa-plus-circle increment"></i>
              <span class="quantity">${product.cartQuantity}</span>
              <i class="fas fa-minus-circle decrement"></i>
            </div>
            <div>
              <i class="fas fa-trash-alt"></i>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    `;

    const incrementBtn = productDiv.querySelector('.increment');
    if (incrementBtn) incrementBtn.addEventListener('click', () =>  increaseCartQuantity(product.id));

    const decrementBtn = productDiv.querySelector('.decrement');
    if (decrementBtn) decrementBtn.addEventListener('click', () =>  decreaseCartQuantity(product.id));

    const quantityEl = productDiv.querySelector('span.quantity');
    if (quantityEl) product.quantityEl = quantityEl;

    const favoriteEl = productDiv.querySelector('i.fa-heart');
    if (favoriteEl) {
      favoriteEl.style.color = 'lightgray';
      product.favoriteEl = favoriteEl;
      favoriteEl.addEventListener('click', () => toggleFavorite(product.id))
    };

    const deleteEl = productDiv.querySelector('i.fa-trash-alt');
    if (deleteEl) deleteEl.addEventListener('click', () => deleteCartItem(product.id))

    productCards.push(productDiv);
  });

  productListEl.innerHTML = ``;

  if (productCards.length) {
    productListEl.append(...productCards)
    return;
  }

  const emptyStateDiv = document.createElement('div');
  emptyStateDiv.className = "text-center";
  emptyStateDiv.textContent = "No Products in Cart"
  productListEl.append(emptyStateDiv);
}

renderProductItems();