import { Router } from 'express';
import { __dirname } from '../../util/utils.js';
import ProductManager from '../../manager/ProductManager.js';
import CartManager from '../../manager/CartManager.js';


const managerProducts = new ProductManager(__dirname + '../../data/Products.json');
const managerCarts = new CartManager(__dirname + '../../data/Carts.json');

const router = Router();


router.get('/:cid', async (req, res) => {
    try {
        const getCartId = await managerCarts.getCartById(+req.params.cid);
        if (!getCartId) {
            res.status(400).json({
                message: `Bad Request, Cart with id ${req.params.cid} not Found`
            });
        }
        res.status(200).json({
            message: `Success, There is a Cart with id ${req.params.cid}`,
            data: getCartId
        });
    } catch (error) {
        res.status(500).json({ error });
    }

});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const product = managerProducts.getProductById(+pid);
        const cart = managerCarts.getCartById(+cid);
        if (!product) {
            res.status(400).json({
                message: `Bad Request, Product with id ${pid} not Found`
            });
        }
        if (!cart) {
            res.status(400).json({
                message: `Bad Request, Cart with id ${cid} not Found`
            });
        }

        const prodAdd = await managerCarts.addProduct(+cid, +pid)

        res.status(200).json({
            message: `Successfully added product with id ${pid} to the cart with id ${cid}`,
            data: prodAdd
        });
    } catch (error) {
        res.status(500).json({ error });
    }

});

router.post('/', async (req, res) => {
    try {
        if(req.body){
            res.status(401).json({
                message: "Error, Unauthorized, it is restricted to enter  attributes",
                error: "params entered by unauthorized person"
            });
        }
        await managerCarts.addCart();
        res.status(200).json({
            message: `Successfully added`,
            data: await managerCarts.getCarts()
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;