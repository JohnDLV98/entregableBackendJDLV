import { Router } from 'express'
import { __dirname } from '../../util/utils.js'
import { productManagerMongo } from '../../dao/manager/product/ProductManagerMongo.js'
import { baseUrl } from '../../app.js'
// import ProductManager from '../../dao/manager/product/ProductManagerFS.js'
// import { productsModel } from '../../dao/models/products.model.js'

// const manager = new ProductManager(__dirname + '../../data/Products.json');
const router = Router()

//Routes /api/products/...
router.get('/', async (req, res) => {
  try {
    const products = await productManagerMongo.findAll(req.query)
    // console.log(products.info.count);
    if (req.query.limit > products.info.count) {
      return res.status(400).json({
        status: 'error',
        message: "Bad Request, There isn't enough products",
      })
    }
    const response = {
      payload: products.info.payload,
      totalPages: products.info.totalPages,
      prevPage: products.info.prevPage,
      nextPage: products.info.nextPage,
      page: products.info.page,
      hasPrevPage: products.info.hasPrevPage,
      hasNextPage: products.info.hasNextPage,
      prevLink: products.info.prevLink,
      nextLink: products.info.nextLink,
    }

    return res.status(200).json({
      status: 'success',
      data: products,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/:pid', async (req, res) => {
  try {
    const product = await productManagerMongo.findById(req.params.pid)
    if (product.name === 'CastError') {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found`,
      })
    }
    return res.status(200).json({
      message: `Success, There is a Product with id ${req.params.pid}`,
      data: product,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/', async (req, res) => {
  const { title, description, price, code, stock } = req.body
  const keysBodySize = Object.keys(req.body).length // para ver cuantas llaves me llegaron, si no envian nada por body será 0, o sea un false logico

  if (!keysBodySize) {
    return res.status(401).json({
      message: 'Error, Enter data for body',
      error: 'no data found by body',
    })
  }

  if (!(title && description && price && code && stock) || req.body.id) {
    return res.status(400).json({
      message: 'Error, Bad Request, Check The Data',
      error: 'Wrong Data',
    })
  }

  try {
    const newProduct = await productManagerMongo.createOne(req.body)

    res.status(200).json({
      message: `successfully added`,
      data: newProduct,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

// router.post('/', async (req, res) => {
//   try {
//     const result = await productsModel.insertMany([
//       {
//         title: "Smartphone iPhone 13",
//         description: "Nuevo iPhone 13 con pantalla OLED y cámara avanzada.",
//         code: "IPHN13BLK",
//         price: 999.99,
//         status: true,
//         stock: 50,
//         category: "Electrónica"
//       },
//       {
//         title: "Laptop HP Spectre x360",
//         description: "Portátil convertible con procesador Intel Core i7.",
//         code: "HPSX360",
//         price: 1299.99,
//         status: true,
//         stock: 25,
//         category: "Informática"
//       },
//       {
//         title: "Zapatillas Adidas Ultraboost",
//         description: "Zapatillas deportivas para correr con tecnología Boost.",
//         code: "ADIDASUB",
//         price: 149.99,
//         status: true,
//         stock: 100,
//         category: "Ropa y Calzado"
//       },
//       {
//         title: "Smart TV Samsung 4K",
//         description: "Televisor Samsung 4K con pantalla de 55 pulgadas.",
//         code: "SAMSUNG4K55",
//         price: 799.99,
//         status: true,
//         stock: 30,
//         category: "Electrónica"
//       },
//       {
//         title: "Cámara Canon EOS 80D",
//         description: "Cámara DSLR con sensor de 24.2MP y pantalla táctil.",
//         code: "CANON80D",
//         price: 899.99,
//         status: true,
//         stock: 15,
//         category: "Fotografía"
//       },
//       {
//         title: "Lavadora Whirlpool",
//         description: "Lavadora de carga frontal con capacidad de 8 kg.",
//         code: "WHRLL8KG",
//         price: 449.99,
//         status: true,
//         stock: 40,
//         category: "Electrodomésticos"
//       },
//       {
//         title: "Reloj Casio G-Shock",
//         description: "Reloj resistente a golpes y agua con funciones avanzadas.",
//         code: "CASIOGSHK",
//         price: 149.99,
//         status: true,
//         stock: 60,
//         category: "Moda"
//       },
//       {
//         title: "Juego de Mesa Catan",
//         description: "Juego de estrategia para la familia.",
//         code: "CATAN",
//         price: 39.99,
//         status: true,
//         stock: 20,
//         category: "Juegos de Mesa"
//       },
//       {
//         title: "Libro 'Cien años de soledad'",
//         description: "Novela clásica de Gabriel García Márquez.",
//         code: "100ASOLEDAD",
//         price: 14.99,
//         status: true,
//         stock: 75,
//         category: "Libros"
//       },
//       {
//         title: "Bicicleta de Montaña Trek",
//         description: "Bicicleta de montaña con cuadro de aluminio y suspensión delantera.",
//         code: "TREKMTB",
//         price: 699.99,
//         status: true,
//         stock: 10,
//         category: "Deportes y Aire Libre"
//       },
//       {
//         title: "Mesa de Comedor Moderna",
//         description: "Mesa de comedor de vidrio y acero inoxidable.",
//         code: "MODERNMESA",
//         price: 349.99,
//         status: true,
//         stock: 5,
//         category: "Muebles"
//       },
//       {
//         title: "Auriculares Inalámbricos Sony",
//         description: "Auriculares Bluetooth con cancelación de ruido.",
//         code: "SONYBLT",
//         price: 149.99,
//         status: true,
//         stock: 30,
//         category: "Electrónica"
//       },
//       {
//         title: "Camiseta Adidas Originals",
//         description: "Camiseta con el logotipo de Adidas en el pecho.",
//         code: "ADIDASORIG",
//         price: 29.99,
//         status: true,
//         stock: 100,
//         category: "Ropa y Calzado"
//       },
//       {
//         title: "Botella de Vino Tinto Malbec",
//         description: "Botella de vino tinto Malbec de la región de Mendoza, Argentina.",
//         code: "MALBECVINO",
//         price: 19.99,
//         status: true,
//         stock: 50,
//         category: "Alimentos y Bebidas"
//       },
//       {
//         title: "Pelota de Fútbol Nike",
//         description: "Pelota de fútbol con diseño de alta visibilidad.",
//         code: "NIKEFUTBOL",
//         price: 24.99,
//         status: true,
//         stock: 40,
//         category: "Deportes y Aire Libre"
//       },
//       {
//         title: "Silla de Oficina Ergonómica",
//         description: "Silla de oficina con soporte lumbar y ajustes personalizados.",
//         code: "ERGOSILLA",
//         price: 249.99,
//         status: true,
//         stock: 15,
//         category: "Muebles"
//       },
//       {
//         title: "Teclado Mecánico Corsair",
//         description: "Teclado mecánico para juegos con retroiluminación RGB.",
//         code: "CORSAIRKBD",
//         price: 129.99,
//         status: true,
//         stock: 20,
//         category: "Informática"
//       },
//       {
//         title: "Mochila North Face",
//         description: "Mochila resistente al agua con capacidad de 30 litros.",
//         code: "NORTHFACE30L",
//         price: 89.99,
//         status: true,
//         stock: 35,
//         category: "Deportes y Aire Libre"
//       },
//       {
//         title: "Collar de Diamantes",
//         description: "Collar de diamantes con montura de oro blanco.",
//         code: "DIAMCOLLAR",
//         price: 4999.99,
//         status: true,
//         stock: 5,
//         category: "Joyería"
//       },
//       {
//         title: "Set de Ollas de Acero Inoxidable",
//         description: "Set de ollas y sartenes de acero inoxidable de alta calidad.",
//         code: "OLLASINOX",
//         price: 299.99,
//         status: true,
//         stock: 10,
//         category: "Cocina y Hogar"
//       }
//     ]
//     )
//     return result
//   } catch (error) {
//     return error
//   }
// })

router.put('/:pid', async (req, res) => {
  if (req.body.id || req.body._id) {
    return res.status(401).json({
      message:
        'Error, Unauthorized, it is restricted to enter the id attribute',
      error: 'id entered for boody by unauthorized person',
    })
  }

  const keysBody = Object.keys(req.body)

  if (!keysBody.length) {
    return res.status(401).json({
      message: 'Error, Enter data for body',
      error: 'no data found by body',
    })
  }

  try {
    const product = await productManagerMongo.findById(req.params.pid)

    if (product.name === 'CastError') {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found or Wrong data`,
        error: 'ID not found, Cast Error',
      })
    }

    // console.log(Object.keys(req.body), product._doc);

    for (const key of keysBody) {
      if (!(key in product._doc)) {
        return res.status(400).json({
          message: `The attribute ${key} doesn't exist in the model`,
          error: `Attribute ${key} entered by body`,
        })
      }
    }

    const updatedProduct = await productManagerMongo.updateOne(
      req.params.pid,
      req.body
    )
    return res.status(200).json({
      message: `Product successfully updated`,
      data: updatedProduct,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.delete('/:pid', async (req, res) => {
  try {
    const product = await productManagerMongo.findById(req.params.pid)

    if (product.name === 'CastError') {
      return res.status(400).json({
        message: `Bad Request, Product with id ${req.params.pid} not Found`,
        error: 'Incorrect ID by params',
      })
    }

    const deletedProduct = await productManagerMongo.deleteOne(req.params.pid)
    res.status(200).json({
      message: `Product successfully removed`,
      data: deletedProduct,
    })
  } catch (error) {}
})

export const baseUrlProducts = `${baseUrl}products/`
export default router
