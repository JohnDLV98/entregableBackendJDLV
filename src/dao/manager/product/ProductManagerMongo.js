import { productsModel } from '../../models/products.model.js'
import { baseUrlProducts } from '../../../routes/carts/carts.routes.js'
class ProductManagerMongo {
  async findAll(obj) {
    const { limit = 10, page = 1, sort, ...query } = obj

    const options = { limit, page, lean: true }

    if (sort === 'asc') {
      options.sort = { price: 1 }
    }
    if (sort === 'desc') {
      options.sort = { price: -1 }
    }

    const queryParameters = { ...query, limit, sort }

    const queryString = Object.entries(queryParameters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    try {
      const result = await productsModel.paginate(query, options)
      // console.log(result);
      const info = {
        count: result.totalDocs,
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `${baseUrl}?page=${result.prevPage}&${queryString}`
          : null,
        nextLink: result.hasNextPage
          ? `${baseUrl}?page=${result.nextPage}&${queryString}`
          : null,
      }
      return { info }
    } catch (error) {
      return error
    }
  }

  // busca un producto desde su id desde la base de datos de mongo db atlas
  async findById(id) {
    try {
      const product = await productsModel.findById(id)
      return product
    } catch (error) {
      return error
    }
  }

  // async getProductsCount(queryOptions = {}) {
  //   return await Product.countDocuments(queryOptions);
  // }

  async createOne(obj) {
    try {
      const product = await productsModel.create(obj)
      return product
    } catch (error) {
      return error
    }
  }

  async updateOne(id, data) {
    try {
      const response = await productsModel.updateOne(
        { _id: id },
        { $set: data }
      )
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
