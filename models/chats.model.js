const { Schema, model } = require('mongoose')

const schema = new Schema({

})

const chatModel = model('messages', schema)

module.exports = chatModel