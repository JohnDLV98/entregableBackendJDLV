import { Router } from 'express';
import { __dirname } from '../../util/utils.js';
import ProductManager from '../../manager/ProductManager.js';


const manager = new ProductManager(__dirname+ '../../data/Products.json');
const router = Router();


//Routes /api/products/...
router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        const { limit } = req.query;
        if (!req.query.limit) {
            res.status(200).json({
                message: "Success, All The Products",
                data: products
            });
        }
        if (+limit > products.length) {
            res.status(400).json({
                message: "Bad Request, There isn't enough products"
            });
        }

        const limitProducts = products.slice(0, +limit);
        res.status(200).json({
            message: `Success, Limit of ${limit} Products Found`,
            data: limitProducts
        });

    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await manager.getProductById(+req.params.pid);
        if (!product) {
            res.status(400).json({
                message: `Bad Request, Product with id ${req.params.pid} not Found`
            });
        }
        res.status(200).json({
            message: `Success, There is a Product with id ${req.params.pid}`,
            data: product
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        if (!(product.title && product.description && product.code && product.price && product.stock && product.category) || req.body.id) {
            res.status(400).json({
                message: "Error, Bad Request, Check The Data",
                error: "Wrong Data"
            });
        }

        const newProduct = await manager.addProduct(product);

        res.status(200).json({
            message: `successfully added`,
            data: newProduct
        });

    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put('/:pid', async (req, res) => {

    if (req.body.id) {
        res.status(401).json({
            message: "Error, Unauthorized, it is restricted to enter the id attribute",
            error: "id entered by unauthorized person"
        });
    }
    if (!(await manager.getProductById(+req.params.pid))) {
        res.status(400).json({
            message: `Bad Request, Product with id ${req.params.pid} not Found`
        });
    }

    const updatedProduct = await manager.updateProduct(+req.params.pid, req.body)
    res.status(200).json({
        message: `Product successfully updated`,
        data: updatedProduct
    });

});

router.delete('/:pid', async (req,res) => {
    if (!(+req.params.pid)) {
        res.status(400).json({
            message: `Bad Request, Product with id ${req.params.pid} not Found`
        });
    }

    const deletedProduct = await manager.deleteProduct(+req.params.pid);    
    res.status(200).json({
        message: `Product successfully removed`,
        data: deletedProduct
    });
})
export default router;