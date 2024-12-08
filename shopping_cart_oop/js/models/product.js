class Product {
  constructor({ 
    id, name, description, price, cartQuantity, imageSrc, 
    isFavorite, quantityEl, favoriteEl, deleted 
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageSrc = imageSrc;
    this.isFavorite = isFavorite;
    this.favoriteEl = favoriteEl;
    this.deleted = deleted;
  }
}