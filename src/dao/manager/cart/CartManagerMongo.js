import { cartModel } from '../../models/carts.model.js'
// import { productsModel } from '../../models/products.model.js'
import { productManagerMongo } from '../product/ProductManagerMongo.js'


class CartManagerMongo {
  async findAll() {
    try {
      const carts = await cartModel.find({}).populate('products.product').lean();
      return carts
    } catch (error) {
      return `Error by findAll ${error}`;
    }
  }

  async createOne() {
    try {
      const carts = await cartModel.create({})
      return carts
    } catch (error) {
      return `Error by createOne ${error}`;
    }
  }

  async addProductCart(cid, pid, newQuantity) {
    
    try {
      const cart = await cartModel.findById(cid)
      console.log(cart);
      const existingProduct = cart.products.find(
        (prod) => prod.product.toString() === pid)
        
      if (!existingProduct) {
        cart.products.push({ product: pid, quantity: +newQuantity || 1 });
      } else {
        existingProduct.quantity += +newQuantity || 1;
      }
      console.log(cart.products);
      
      return await cart.save();
      

    } catch (error) {
      return error;
    }
  }

  // async addProductCart(cid, pid, newQuantity) {
  //   try {
  //     const cart = await this.findById(cid);
  //     const existingProduct = cart.products.find(
  //       (prod) => prod.id === pid
  //     )
  //     if (existingProduct) {
  //       existingProduct.quantity += newQuantity || 1;
  //     } else {
  //       cart.products.push({ product: pid, quantity: newQuantity || 1 });
  //     }
  //     const savedCart = await cart.save();
  //     return savedCart;
  //   } catch (error) {
  //     return `Error by addProductCart ${error}`;
  //   }
  // }

  async findById(id) {
    try {
      const cart = await cartModel.findById(id).populate("products.product").lean();
      return cart
    } catch (error) {
      return error
    }
  }

  // async updateProductQuantity(cid, obj) {

  //   try {

  //     const cart = await this.findById(cid);

  //     obj.forEach((newProduct) => {
  //       const existingProduct = cart.products.find(
  //         (product) => product.id._id.toString() === newProduct.id
  //       );

  //       if (existingProduct) {
  //         existingProduct.quantity = newProduct.quantity;
  //       } else {
  //         cart.products.push(newProduct);
  //       }

  //     });
  //     const updatedCart = await cart.save();

  //     return updatedCart;

  //   } catch (error) {
  //     return `Error by updateOne ${error}`;
  //   }
  // }

  async putQuantityProduct(cid, pid, newQuantity) {
    try {

      const result = await cartModel.updateOne(
        { _id: cid, "products.product": pid},
        { $set: { "products.$.quantity": newQuantity } }
      );

      return result;

    } catch (error) {
      return `Error by addProductCart ${error}`;
    }
  }


  async deleteOneProduct(cid, pid) {
    try {

      const result = await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
      );
        
      return result;

    } catch (error) {
      return `Error by addProductCart ${error}`;
    }
  }

  async deleteAllProductsCart(cid) {

    try {
      const cart = await this.getCartById(cid);
      const response = await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
      return response;
    } catch (error) {
      return `Error by deleteAllProductsCart ${error}`;
    }
  }
}


export const cartManagerMongo = new CartManagerMongo()