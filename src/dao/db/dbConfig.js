import mongoose from "mongoose";

const URL = 'mongodb+srv://johnDaLonVaDev10:KUktxvm4nPhxeSph@cluster0.pdpcbcr.mongodb.net/ecommerceDB?retryWrites=true&w=majority'

mongoose.connect(URL)
.then( () => console.log('Conectado a la base de datos'))
.catch( error => console.log('Error by dbConfig ', error))