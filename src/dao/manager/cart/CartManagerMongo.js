import { cartModel } from '../../models/carts.model.js'
import { productsModel } from '../../models/products.model.js'
import { productManagerMongo } from '../product/ProductManagerMongo.js'


class CartManagerMongo {
  async findAll() {
    try {
      const carts = await cartModel.find({})
      return carts
    } catch (error) {
      return error
    }
  }

  async createOne() {
    try {
      const carts = await cartModel.create({})
      return carts
    } catch (error) {
      return error
    }
  }

//   async createOneProduct(idCart, idProduct) {
//     try {
//         const cart = await this.findById(idCart); 
//         const product = await productManagerMongo.findById(idProduct)
//         if (cart && product) {
          
//         } else {
          
//         } 
//         const productIndex = cart.products.findIndex(prod => prod.product === idProduct);
//         if (productIndex === -1) {
//             cart.products.push({
//                 product: idProduct,
//                 quantity: 1
//             })
//         }
//         else {
//             cart.products[productIndex].quantity++
//         }
//         const cartIndex = carts.findIndex(item => item.id === cart.id)
//         carts[cartIndex] = cart
//         const cartString = await JSON.stringify(carts, null, "\t");
//         await this.writeFile(cartString);

//         return cart;


//     } catch (error) {
//         throw new Error(error);
//     }
// }

  async findById(id) {
    try {
      const cart = await cartModel.findById(id)
      return cart
    } catch (error) {
      return error
    }
  }

  async updateOne(id, obj) {
    try {
      const response = await cartModel.updateOne({ _id: id }, { ...obj })
      return response
    } catch (error) {
      return error
    }
  }

  async deleteOne(id) {
    try {
      const response = await cartModel.findByIdAndDelete(id)
      return response
    } catch (error) {
      return error
    }
  }
}

export const cartManagerMongo = new CartManagerMongo()
