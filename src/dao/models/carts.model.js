import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsSchema = new mongoose.Schema({
  products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: {
        type: Number,        
      },
  }],
})

cartsSchema.plugin(mongoosePaginate);

export const cartModel = mongoose.model('Carts', cartsSchema)