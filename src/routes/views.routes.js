import { Router } from 'express';
import productManager from '../dao/manager/product/ProductManagerFS.js';
import { __dirname } from '../util/utils.js';

const router = Router();
const managerProducts = new productManager(__dirname + '../../data/Products.json')

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/home', async (req, res) => {
  const products = await managerProducts.getProducts();
  const data = {
    title: "productos desde views router",
    list: products
  }
  res.render('home', data)
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await managerProducts.getProducts();
  const data = {
    title: "productos desde views router real time products",
    list: products
  }
  res.render('realTimeProducts', data)
});

router.get('/chat', async (req, res) => {
  res.render('chat', {});
});

export default router