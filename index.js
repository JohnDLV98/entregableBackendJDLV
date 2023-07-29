import ProductManager from './src/manager/ProductManager.js';

const manager = new ProductManager('./Products.json')

const productsManager = async () => {
    try {
        console.log("GET PRODUCTS");
        console.log(await manager.getProducts());


        const newProduct1 = {
            title: "Producto Prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };

        console.log("ADD PRODUCT");
        console.log(await manager.addProduct(newProduct1));


        console.log("GET PRODUCT BY ID");
        // console.log(await manager.getProductById(1));
        console.log(await manager.getProductById(18));

        console.log("UPDATE PRODUCT");
        console.log(await manager.updateProduct(2, {
            title: "Producto modificado",
            description: "Este es un producto prueba modificado"
        }));

        console.log("DELETE PRODUCT BY ID");
        console.log(await manager.deleteProduct(4));

    } catch (error) {
        throw new Error(error);
    }
}

productsManager();


