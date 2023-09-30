import { Router } from 'express';
import { __dirname } from '../../util/utils.js';
import ProductManager from '../../dao/manager/product/ProductManagerFS.js';
import { productManagerMongo } from '../../dao/manager/product/ProductManagerMongo.js';

// const manager = new ProductManager(__dirname + '../../data/Products.json');
const router = Router();

//Routes /api/products/...
router.get('/', async (req, res) => {

  try {

    const products = await productManagerMongo.findAll(req.query);
    // console.log(products.info.count);
    if (req.query.limit > products.info.count) {
      return res.status(400).json({
        message: "Bad Request, There isn't enough products"
      });
    }

    return res.status(200).json({
      message: `Success, Products Found`,
      data: products
    });

  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await productManagerMongo.findById(req.params.pid);
    if (product.name === "CastError") {
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
  const { title, description, price, code, stock } = req.body;
  const keysBodySize = Object.keys(req.body).length; // para ver cuantas llaves me llegaron, si no envian nada por body será 0, o sea un false logico

  if (!(keysBodySize)) {
    return res.status(401).json({
      message: "Error, Enter data for body",
      error: "no data found by body"
    });
  }

  if (!(title && description && price && code && stock) || req.body.id) {
    return res.status(400).json({
      message: "Error, Bad Request, Check The Data",
      error: "Wrong Data"
    });
  }

  try {

    const newProduct = await productManagerMongo.createOne(req.body);

    res.status(200).json({
      message: `successfully added`,
      data: newProduct
    });

  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/:pid', async (req, res) => {

  if (req.body.id || req.body._id) {
    return res.status(401).json({
      message: "Error, Unauthorized, it is restricted to enter the id attribute",
      error: "id entered for boody by unauthorized person"
    });
  }

  const keysBody = Object.keys(req.body);

  if (!(keysBody.length)) {
    return res.status(401).json({
      message: "Error, Enter data for body",
      error: "no data found by body"
    });
  }

  try {

    const product = await productManagerMongo.findById(req.params.pid)

    if (product.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found or Wrong data`,
        error: "ID not found, Cast Error"
      });
    }

    // console.log(Object.keys(req.body), product._doc);

    for (const key of keysBody) {
      if (!(key in product._doc)) {
        return res.status(400).json({
          message: `The attribute ${key} doesn't exist in the model`,
          error: `Attribute ${key} entered by body`
        });
      }
    }

    const updatedProduct = await productManagerMongo.updateOne(req.params.pid, req.body)
    return res.status(200).json({
      message: `Product successfully updated`,
      data: updatedProduct
    });

  } catch (error) {
    res.status(500).json({ error });
  }

});

router.delete('/:pid', async (req, res) => {
  try {
    const product = await productManagerMongo.findById(req.params.pid);

    if (product.name === "CastError") {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found`,
        error: 'Incorrect ID by params'
      });
    }

    const deletedProduct = await productManagerMongo.deleteOne(req.params.pid);
    res.status(200).json({
      message: `Product successfully removed`,
      data: deletedProduct
    });
  } catch (error) {

  }


})
export default router;

// const int buttonPin1 = 2;
// const int buttonPin2 = 3;
// const int buttonPin3 = 4;
// const int buttonPin4 = 5;
// const int redPin = 6;
// const int greenPin = 7;
// const int bluePin = 8;

// void setup() {
//   pinMode(buttonPin1, INPUT_PULLUP);
//   pinMode(buttonPin2, INPUT_PULLUP);
//   pinMode(buttonPin3, INPUT_PULLUP);
//   pinMode(buttonPin4, INPUT_PULLUP);
//   pinMode(redPin, OUTPUT);
//   pinMode(greenPin, OUTPUT);
//   pinMode(bluePin, OUTPUT);

// }

// void loop() {

//   if (digitalRead(buttonPin1) == LOW) {

//     analogWrite(redPin, 255);
//     analogWrite(greenPin, 255);
//     analogWrite(bluePin, 0);

//   } else if (digitalRead(buttonPin2) == LOW) {

//     analogWrite(redPin, 0);
//     analogWrite(greenPin, 255);
//     analogWrite(bluePin, 255);

//   } else if (digitalRead(buttonPin3) == LOW) {
//     analogWrite(redPin, 255);
//     analogWrite(greenPin, 0);
//     analogWrite(bluePin, 255);

//   } else if (digitalRead(buttonPin4) == LOW) {
//     analogWrite(redPin, cualquiera);
//     analogWrite(greenPin, cualquirea);
//     analogWrite(bluePin, cualquiera);

//   } else {
//     analogWrite(redPin, 0);
//     analogWrite(greenPin, 0);
//     analogWrite(bluePin, 0);
//   }
// }

// analogWrite(redPin, 0);
// analogWrite(greenPin, 0);
// analogWrite(bluePin, 0);