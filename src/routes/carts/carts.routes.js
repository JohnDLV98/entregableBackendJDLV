import { Router } from 'express';
import { __dirname } from '../../util/utils.js';
import ProductManager from '../../dao/manager/product/ProductManagerFS.js';
import CartManager from '../../dao/manager/cart/CartManagerFS.js';
import { cartManagerMongo } from '../../dao/manager/cart/CartManagerMongo.js'
import { productManagerMongo } from '../../dao/manager/product/ProductManagerMongo.js';

const managerProducts = new ProductManager(__dirname + '../../data/Products.json');
const managerCarts = new CartManager(__dirname + '../../data/Carts.json');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const carts = await cartManagerMongo.findAll();
    if (!(carts) && carts.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Carts not Found`
      });
    }
    return res.status(200).json({
      message: `Success, There is a Cart with id ${req.params.cid}`,
      data: carts
    });
  } catch (error) {
    res.status(500).json({ error });
  }

});

router.get('/:cid', async (req, res) => {
  try {   
    const getCartId = await cartManagerMongo.findById(req.params.cid);
    if (!(getCartId) || getCartId.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Cart with id ${req.params.cid} not Found`
      });
    }
    return res.status(200).json({
      message: `Success, There is a Cart with id ${req.params.cid}`,
      data: getCartId
    });
  } catch (error) {
    res.status(500).json({ error });
  }

});

// router.post('/:cid/product/:pid', async (req, res) => {
//   try {
//     const { cid, pid } = req.params;
//     const cart = await cartManagerMongo.findById(cid);
//     const product = await productManagerMongo.findById(pid);

//     if (!(cart) && cart.name === "CastError") {
//       return res.status(400).json({
//         message: `Bad Request, Cart with id ${cid} not Found`
//       });
//     }
//     if (!(product) && product.name === "CastError") {
//       return res.status(400).json({
//         message: `Bad Request, Product with id ${pid} not Found`
//       });
//     }

//     const prodAdd = await cartManagerMongo.createOneProduct(cid, pid)

//     return res.status(200).json({
//       message: `Successfully added product with id ${pid} to the cart with id ${cid}`,
//       data: prodAdd
//     });
//   } catch (error) {
//     res.status(500).json({ error });
//   }

// });

router.post('/', async (req, res) => {
  try {
    const counterStringBody = JSON.stringify(req.body)
    if (counterStringBody.length > 2) {
      return res.status(401).json({
        message: "Error, Unauthorized, it is restricted to enter  attributes",
        error: "params entered by unauthorized person"
      });
    }
    await cartManagerMongo.createOne();
    return res.status(200).json({
      message: `Successfully added`,
      data: await cartManagerMongo.findAll()
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;