import { productsModel } from '../../models/products.model.js'

class ProductManagerMongo {
  async findAll() {
    try {
      const products = await productsModel.find({})
      return products
    } catch (error) {
      return error
    }
  }

  async findById(id) {
    try {
      const product = await productsModel.findById(id)
      return product
    } catch (error) {
      return error
    }
  }

  async createOne(obj) {
    try {
      const product = await productsModel.create(obj)
      return product
    } catch (error) {
      return error
    }
  }

  async updateOne(id, obj) {
    try {
      const response = await productsModel.updateOne({ _id: id }, { ...obj })
      return response
    } catch (error) {
      return error
    }
  }

  async deleteOne(id) {
    try {
      const response = await productsModel.findByIdAndDelete(id)
      return response
    } catch (error) {
      return error
    }
  }
}

export const productManagerMongo = new ProductManagerMongo()
