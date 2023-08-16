import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './util/utils.js';
import { Server } from 'socket.io';
import apiRoutes from './routes/app.routers.js';
import ProductManager from './manager/ProductManager.js'

const manager = new ProductManager(__dirname + '../../data/Products.json');
const PORT = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../../public'));

// Template Engine - handlebars
app.engine('handlebars', handlebars.engine()); // le digo al servidor que tenga en su memoria un motor de plantilla con estas funciones
app.set('view engine', 'handlebars');   // cual es el motor de plantilla que vamos a usar
app.set('views', __dirname + '../../views'); // la carpeta views va a estar en esta direccion

//Routes
app.use('/api', apiRoutes);

//Listen
const httpServer = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('cliente conectado', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    socket.on('postProduct', async (newProduct) => {
        const prod = await manager.addProduct(newProduct)
        const allProducts = await manager.getProducts()
        socketServer.emit('postProductTable', prod)
    })

    socket.on('deleteProduct', async (content) => {        
        await manager.deleteProduct(+content)
        const products = await manager.getProducts()
        socketServer.emit('newArrProducts', products)
    })
})
