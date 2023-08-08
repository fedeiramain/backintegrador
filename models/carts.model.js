const { Schema, model } = require('mongoose')

const schema = new Schema({

})

const cartModel = model('carts', schema)

module.exports = cartModel