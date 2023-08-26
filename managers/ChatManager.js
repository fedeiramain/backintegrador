const chatModel = require('../models/chats.model')

class ChatManager {

  async getAll() {
    const allMsg = await chatModel.find().lean()

    return allMsg
  }

  async create(msg) {
    const create = await chatModel.create(msg)

    return create
  }
}

module.exports = new ChatManager()