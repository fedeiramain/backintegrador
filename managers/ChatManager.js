const chatModel = require('../models/chats.model')

class ChatManager {

  getAll() {
    return chatModel.find().lean()
  }

  create(msg) {
    return chatModel.create(msg)
  }
}

module.exports = new ChatManager()