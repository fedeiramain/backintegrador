const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: String,
    description: String,
    price: Number,
    keywords: [String],
    createDate: { type: Number, default: Date.now() }
})

const prodcutsmodel = model('products', schema)

module.exports = prodcutsmodel