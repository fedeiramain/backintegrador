const { Schema, model } = require('mongoose')

const schema = new Schema({
    products: { 
        type: [{
          product: { type: Schema.Types.ObjectId, ref: 'products' },
          qty: { type: Number, default: 0 }
        }],
        default: []
      },
      createdDate: { type: Number, default: Date.now() }
})

const cartModel = model('carts', schema)

module.exports = cartModel