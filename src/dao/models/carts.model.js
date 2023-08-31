import mongoose from "mongoose";

const cartsSchemma = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.Array,
        product: {
            type: mongoose.Schema.Types.ObjectId
        },
        quantity: {
            type: Number
        }
    }]
})

export const cartModel = mongoose.model('Carts', cartsSchemma)