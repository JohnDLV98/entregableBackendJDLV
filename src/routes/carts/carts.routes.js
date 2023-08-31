import { Router } from 'express';
import { __dirname } from '../../util/utils.js';
import ProductManager from '../../dao/manager/managerFS/ProductManagerFS.js';
import CartManager from '../../dao/manager/managerFS/CartManagerFS.js';


const managerProducts = new ProductManager(__dirname + '../../data/Products.json');
const managerCarts = new CartManager(__dirname + '../../data/Carts.json');

const router = Router();

router.get('/:cid', async (req, res) => {
    try {
        const getCartId = await managerCarts.getCartById(+req.params.cid);
        if (!getCartId) {
            return res.status(400).json({
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
        const cart = await managerCarts.getCartById(+cid);
        const product = await managerProducts.getProductById(+pid);

        if (!cart) {
            return res.status(400).json({
                message: `Bad Request, Cart with id ${cid} not Found`
            });
        }
        if (!product) {
            return res.status(400).json({
                message: `Bad Request, Product with id ${pid} not Found`
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
        const counterStringBody = JSON.stringify(req.body)
        if (counterStringBody.length > 2) {
            return res.status(401).json({
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