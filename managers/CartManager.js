const cartModel = require('../models/carts.model')
const mongoose = require('mongoose')

class CartManager {

  async getAll() {
    return await cartModel.find().lean()
  }

  async getById(id) {
    const product = await cartModel.findOne({ _id: id })

    return product
  }


  async createCart({ user }) {
    return await cartModel.create({ user: new mongoose.Types.ObjectId(user) })
  }
}

module.exports = new CartManager()