import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true,
        default: 0
    },
    category: {
        type: String,
        require: true
    }   
})

export const productsModel = mongoose.model('Products', productsSchema)
