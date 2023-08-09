const { Schema, model } = require('mongoose')

const schema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        default: Date.now()
    }
})

const chatModel = model('messages', schema)

module.exports = chatModel