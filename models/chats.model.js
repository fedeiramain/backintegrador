const { Schema, model } = require('mongoose')

const schema = new Schema({
    user: String,
    text: String,
    datetime: String
})

const chatModel = model('messages', schema)

module.exports = chatModel