const { Schema, model } = require('mongoose')

const schema = new Schema({
  total: Number,
  products: { 
    type: [{
      product: { type: Schema.Types.ObjectId, ref: 'products' },
      qty: { type: Number, default: 0 }
    }],
    default: []
  },
  estimatedDelivery: Number
})

const compraModel = model('orders', schema)

module.exports = compraModel