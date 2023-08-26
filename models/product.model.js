const { Schema, model } = require('mongoose')
const paginate = require('mongoose-paginate-v2')


const schema = new Schema({
    title: String,
    description: String,
    price: Number
})

schema.plugin(paginate)

const productsModel = model('products', schema)

module.exports = productsModel