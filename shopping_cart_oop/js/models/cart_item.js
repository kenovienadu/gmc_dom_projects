class CartItem {
  constructor(id, quantity, price){
    this.productId = id;
    this.quantity = quantity;
    this.price = price;
  }

  totalPrice() {
    return this.price * this.quantity;
  }
}