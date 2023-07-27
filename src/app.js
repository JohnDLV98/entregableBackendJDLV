import express from 'express'
import ProductManager from './manager/ProductManager.js';

const PORT = 8080;

const manager = new ProductManager('./Products.json');

const app = express();

//Routes
app.get('/products', async (req, res) => {
    const products = await manager.getProducts();
    console.log(req.query);

    const limit = req.query.limit;
    console.log(+limit);
    if (!req.query.limit) {
        return res.send(products)
    }
    if (+limit > products.length) {
        return res.status(404).send("Not Enough Products")
    }
    const limitProducts = products.slice(0, +limit)
    res.status(200).send(limitProducts)
})



app.get('/products/:pid', async (req, res) => {
    console.log(req.params);
    console.log(req.params.pid);
    const product = await manager.getProductById(+req.params.pid)
    if (!product) {
        res.status(404).send(`Product with id ${req.params.pid} not Found`)
    } 
        res.status(200).send(product)
    

})

app.listen(PORT, () => {
    console.log("Listening on PORT => ", PORT);
})

