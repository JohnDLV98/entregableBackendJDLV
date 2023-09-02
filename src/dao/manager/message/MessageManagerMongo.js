import { messagesModel } from '../../models/messages.model.js'

class MessageManagerMongo {
  async findAll() {
    try {
      const messages = await messagesModel.find({})
      return messages
    } catch (error) {
      return error
    }
  }

  async findById(id) {
    try {
      const message = await messagesModel.findById(id)
      return message
    } catch (error) {
      return error
    }
  }

  async createOne(obj) {
    try {
      return await messagesModel.create(obj)

    } catch (error) {
      return error
    }
  }

  async updateOne(id, obj) {
    try {
      const response = await messagesModel.updateOne({ _id: id }, { ...obj })
      return response
    } catch (error) {
      return error
    }
  }

  async deleteOne(id) {
    try {
      const response = await messagesModel.findByIdAndDelete(id)
      return response
    } catch (error) {
      return error
    }
  }
}

export const messageManagerMongo = new MessageManagerMongo()
