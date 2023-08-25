const { Schema, model } = require('mongoose')

const schema = new Schema({
    user:String,
    products:Array
})

const cartModel = model('carts', schema)

module.exports = cartModel