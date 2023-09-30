import { Router } from 'express';
import { __dirname } from '../../util/utils.js';
// import ProductManager from '../../dao/manager/product/ProductManagerFS.js';
// import CartManager from '../../dao/manager/cart/CartManagerFS.js';
import { cartManagerMongo } from '../../dao/manager/cart/CartManagerMongo.js'
import { productManagerMongo } from '../../dao/manager/product/ProductManagerMongo.js';

// const managerProducts = new ProductManager(__dirname + '../../data/Products.json');
// const managerCarts = new CartManager(__dirname + '../../data/Carts.json');

const router = Router();

// router.get('/', async (req, res) => {

//   const { limit } = req.query;

//   try {
//     if (limit) {

//     }
//     const carts = await cartManagerMongo.findAll();
//     if (!(carts) && carts.name === "CastError") {
//       return res.status(400).json({
//         message: `Bad Request, Carts not Found`
//       });
//     }
//     return res.status(200).json({
//       message: `Success, There is a Cart with id ${req.params.cid}`,
//       data: carts
//     });
//   } catch (error) {
//     res.status(500).json({ error });
//   }

// });

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

router.post('/:cid/product/:pid', async (req, res) => {

  const { cid, pid } = req.params;
  console.log(cid, pid);
  try {

    const cart = await cartManagerMongo.findById(cid);
    if (cart.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Cart with id ${req.params.cid} not Found`
      });
    }

    const product = await productManagerMongo.findById(pid);
    if (product.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found`
      });
    }

    const prodAdd = await cartManagerMongo.addProductCart(cid, pid)

    return res.status(200).json({
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
        error: "parameters entered by unauthorized person for body"
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

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.

router.delete('/:cid/products/:pid', async (req, res) => {

  const { cid, pid } = req.params;
  console.log(cid, pid);
  try {

    const cart = await cartManagerMongo.findById(cid);
    if (cart.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Cart with id ${req.params.cid} not Found`
      });
    }

    const product = await productManagerMongo.findById(pid);
    if (product.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found`
      });
    }

    const prodDeleted = await cartManagerMongo.deleteOneProduct(cart, product)

    return res.status(200).json({
      message: `Successfully deleted product with id ${pid} to the cart with id ${cid}`,
      data: prodDeleted
    });

  } catch (error) {
    res.status(500).json({ error });
  }

});

// PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put('/:cid', async (req, res) => {

  const { cid } = req.params;
  const products = req.body;
  const keysBody = Object.keys(req.body);

  if (!(keysBody.length)) {
    return res.status(401).json({
      message: "Error, Enter data for body",
      error: "no data found by body"
    });
  }

  if (!Array.isArray(products)) {
    return res.status(400).json({
      message: 'New products must be an Array',
      error: "req.body isn't an array"
    });
  }

  try {

    const cart = await cartManagerMongo.findById(cid);
    if (cart.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Cart with id ${req.params.cid} not Found`
      });
    }

    for (const prod of products) {
      if (!prod.product || !prod.quantity || typeof prod.quantity !== 'number') {
        return res.status(400).json({ message: 'New products must comply with the specified format' });
      }

      const idProduct = prod.product.toString();
      const existingProduct = await productManagerMongo.findById(idProduct)

      if (existingProduct.name === "CastError") {
        return res.status(400).json({
          message: `Bad Request, Product with id ${idProduct} not Found`
        });
      }

      const quantity = prod.quantity;

      await cartManagerMongo.addProductCart(cid, idProduct, quantity);

    }

    return res.status(200).json({
      message: `Successfully putted products to cart with id ${cid}`,
      data: await cartManagerMongo.findById(cid)
    });

  } catch (error) {
    res.status(500).json({ error });
  }

});


// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/products/:pid', async (req, res) => {

  const { cid, pid } = req.params;
  const { quantity } = req.body;
  console.log(cid, pid, quantity);
  try {

    const cart = await cartManagerMongo.findById(cid);
    if (cart.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Cart with id ${req.params.cid} not Found`
      });
    }

    const product = await productManagerMongo.findById(pid);
    if (product.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found`
      });
    }

    const quantityAdd = await cartManagerMongo.putQuantityProduct(cid, pid, quantity)

    return res.status(200).json({
      message: `Successfully added quantity to product with id ${pid} to the cart with id ${cid}`,
      data: quantityAdd
    });

  } catch (error) {
    res.status(500).json({ error });
  }

});


// DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const getCartId = await cartManagerMongo.findById(cid);
    if (getCartId.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Cart with id ${req.params.cid} not Found`
      });
    }
    const cartToReset = await cartManagerMongo.deleteAllProductsCart(cid) 
    return res.status(200).json({
      message: `Success, products removed from the cart with id ${cid}`,
      data: await cartManagerMongo.findById(cid)
    });
  } catch (error) {
    res.status(500).json({ error });
  }

});


export default router;