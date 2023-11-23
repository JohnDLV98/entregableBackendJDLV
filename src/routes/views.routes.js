import { Router } from 'express';
// import productManager from '../dao/manager/product/ProductManagerFS.js';
import { __dirname } from '../util/utils.js';
import { productManagerMongo } from '../dao/manager/product/ProductManagerMongo.js';
import { cartManagerMongo } from '../dao/manager/cart/CartManagerMongo.js';

const router = Router();
// const managerProducts = new productManager(__dirname + '../../data/Products.json')

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/cart/:cid', async (req,res) => {

  const cart = await cartManagerMongo.findById(req.params.cid)
  // console.log(cart.name === "CastError")
  const data = {
    title: "cart desde views router",
    isValid: !(cart.name === "CastError"),
    info: cart.products
  }
  console.log(data.info);
  res.render('cartId', data)
})

router.get('/viewsProducts', async (req, res) => {
  const products = await productManagerMongo.findAll(req.query);
  // console.log(+req.query.page);
  // console.log(products.info.payload);
  console.log(products);
  // products.info.prevLink = (products.info.hasPrevPage)
  // ? `http://localhost:8080/api/home?page=${products.info.prevPage}`
  // : null;

  // products.info.nextLink = (products.info.hasNextPage)
  // ? `http://localhost:8080/api/home?page=${products.info.nextPage}`
  // : null;

  const data = {
    title: "productos desde views router",
    isValid: !(req.query.page <=0 || products.info.page > products.info.totalPages),
    infoData: products.info
  }
  // console.log(data);
  res.render('home', data)  
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManagerMongo.findAll(req.query);
  const data = {
    title: "productos desde views router real time products",
    infoData: products.info,
    payload: products.info.payload
  }
  // console.log(data);
  res.render('realTimeProducts', data)
});

router.get('/chat', async (req, res) => {
  res.render('chat', {});
});

export default router