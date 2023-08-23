const cartModel = require('../models/carts.model')

class CartManager {

  getAll() {
    return cartModel.find().lean()
  }

  create(product) {
    return cartModel.create(product)
  }
}

module.exports = new CartManager()