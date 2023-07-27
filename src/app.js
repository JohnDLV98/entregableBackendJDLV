import express from 'express'
import ProductManager from './manager/ProductManager';

const PORT = 8080;

const manager = new ProductManager('./Products.json');

const app = express();

//Routes
app.get('/products', async (req,res) => {
    const products = await manager.getProducts();
    console.log(req.query);
    const limit = req.query.limit;
    if (!req.query.limit) {
        return res.send(products)        
    }
    if(+limit > products.length){
        return res.status(404).send("Not enough products")
    }
    const limitProducts = products.slice(0,+limit)
    res.status(200).send(limitProducts)
})

app.listen(PORT, () => {
    console.log("Listening on PORT => ", PORT);
})