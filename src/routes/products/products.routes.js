import { Router } from 'express';
import { __dirname } from '../../util/utils.js';
import ProductManager from '../../dao/manager/product/ProductManagerFS.js';
import { productManagerMongo } from '../../dao/manager/product/ProductManagerMongo.js';

const manager = new ProductManager(__dirname + '../../data/Products.json');
const router = Router();


//Routes /api/products/...
router.get('/', async (req, res) => {
  try {
    const products = await productManagerMongo.findAll();
    const { limit } = req.query;
    console.log(limit)
    if (!limit) {
      return res.status(200).json({
        message: "Success, All The Products",
        data: products
      });
    }
    if (+limit > products.length) {
      return res.status(400).json({
        message: "Bad Request, There isn't enough products"
      });
    }

    const limitProducts = products.slice(0, +limit);
    return res.status(200).json({
      message: `Success, Limit of ${limit} Products Found`,
      data: limitProducts
    });

  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await productManagerMongo.findById(req.params.pid);
    if (!product) {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found`
      });
    }
    return res.status(200).json({
      message: `Success, There is a Product with id ${req.params.pid}`,
      data: product
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const counterStringBody = JSON.stringify(req.body)
    if (counterStringBody.length <= 2) {
      return res.status(401).json({
        message: "Error, Enter data for body",
        error: "no data found by body"
      });
    }
    const product = req.body;
    if (!(product.title && product.description && product.code && product.price && product.stock && product.category) || req.body.id) {
      return res.status(400).json({
        message: "Error, Bad Request, Check The Data",
        error: "Wrong Data"
      });
    }

    const newProduct = await productManagerMongo.createOne(product);

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
    return res.status(401).json({
      message: "Error, Unauthorized, it is restricted to enter the id attribute",
      error: "id entered by unauthorized person"
    });
  }

  const product = await productManagerMongo.findById(req.params.pid)

  if (!(product) || product.name === "CastError") {
    return res.status(400).json({
      message: `Bad Request, Product with id ${req.params.pid} not Found or Wrong data`
    });
  }

  const updatedProduct = await productManagerMongo.updateOne(req.params.pid, req.body)
  res.status(200).json({
    message: `Product successfully updated`,
    data: updatedProduct
  });

});

router.delete('/:pid', async (req, res) => {
  try {
    const product = await productManagerMongo.findById(req.params.pid);
    if (!(product) || product.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found`
      });
    }

    const deletedProduct = await productManagerMongo.deleteOne(+req.params.pid);
    res.status(200).json({
      message: `Product successfully removed`,
      data: deletedProduct
    });
  } catch (error) {

  }

})
export default router;