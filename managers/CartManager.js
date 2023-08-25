const cartModel = require('../models/carts.model')
const mongoose = require('mongoose')

class CartManager {

  getAll() {
    return cartModel.find().lean()
  }

  async getById(id) {
    const product = await cartModel.findOne({ _id: id })

    return product
}
async createCart({ user }) {
  await cartModel.create({ user: new mongoose.Types.ObjectId(user) })
}

  create(product) {
    return cartModel.create(product)
  }
}

module.exports = new CartManager()