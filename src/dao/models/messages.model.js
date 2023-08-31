import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
        unique: true
    },
    message: {
        type: String,
        require: true
    }
})

export const productsModel = mongoose.model('Products', messagesSchema)