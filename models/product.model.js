const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: String,
    description: String,
    price: Number,
})

const productsModel = model('products', schema)

module.exports = productsModel