
const fs = require('fs/promises');
const { existsSync } = require('fs');

class ProductManager {
    static idCounter = 0;
    constructor(path) {
        this.path = path
    }

    async readFile() {
        return await fs.readFile(this.path, 'utf-8');
    }

    async writeFile(string) {
        return await fs.writeFile(this.path, string, 'utf-8');
    }

    /* 
        getProducts
    - Debe devolver el arreglo con todos los productos creados hasta ese momento
    */
    async getProducts() {
        try {
            if (existsSync(this.path)) {
                const dataProducts = await this.readFile();
                const products = JSON.parse(dataProducts);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    /* 
        addProduct
    - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
    - Al agregarlo, debe crearse con un id autoincrementable
    */
    async addProduct(product) {
        try {
            const products = await this.getProducts();
            if (!products.length) {
                ProductManager.idCounter = 1;
            } else {
                ProductManager.idCounter = products[products.length - 1].id + 1;
            }
            const newProduct = {
                id: ProductManager.idCounter,
                ...product
            };
            products.push(newProduct);
            const productString = await JSON.stringify(products, null, "\t");
            await this.writeFile(productString);
            console.log(`
                ------------------AGGREGATED-------------
                `);
            return newProduct;
        } catch (error) {
            throw new Error(error);
        }
        // if (!(title && description && price && thumbnail && code && stock)) {
        //     console.error("Incomplete data");
        //     return;
        // }
        // const foundCode = this.products.find(product => product.code === code);
        // if (foundCode) {
        //     console.warn("Repeated code")
        //     return;
        // }

        // ProductManager.idCounter++;

        // const newProduct = {
        //     id: ProductManager.idCounter,
        //     title,
        //     description,
        //     price,
        //     thumbnail,
        //     code,
        //     stock
        // };

        // this.products.push(newProduct);
    }



    /*
        getProductById
    - Debe buscar en el arreglo el producto que coincida con el id
    - En caso de no coincidir ningún id, mostrar en consola un error “Not found”
    */
    async getProductById(idProduct) {
        try {
            const products = await this.getProducts();
            const foundProduct = products.find(product => product.id === idProduct);
            if (foundProduct) {
                return foundProduct;
            } else {
                console.log(`-----------------------
                Product not found from getProductById
                ------------------------`)
            }

        } catch (error) {
            throw new Error(error)
        }
        // const foundId = this.products.find(product => product.id === idProduct);
        // if (!foundId) {
        //     return "ERROR, Not found";
        // }
        // return foundId;
    }

    async updateProduct(idProduct, newProperties) {
        try {
            const products = await this.getProducts();
            const foundProductById = await this.getProductById(idProduct);

            if (foundProductById) {                
            
                const productUpdated = { ...foundProductById, ...newProperties };

                const replacedProductList = products.map(product => {
                    if (product.id === productUpdated.id) {
                        return productUpdated;
                    } else {
                        return product;
                    }
                });
                const stringProductsList = await JSON.stringify(replacedProductList, null, "\t");

                await this.writeFile(stringProductsList);
                console.log(`
                ------------------UPDATED-------------
                `);
                return await this.getProductById(idProduct);
            }


        } catch (error) {
            throw new Error(error)
        }

    }

    async deleteProduct(idProduct) {
        try {
            const products = await this.getProducts();
            const foundProductById = await this.getProductById(idProduct);
            if (foundProductById) {
                const foundIndex = products.findIndex(product => product.id === foundProductById.id);

                products.splice(foundIndex, 1);

                const stringProductsList = await JSON.stringify(products, null, "\t");

                await this.writeFile(stringProductsList);
                console.log(`
                ------------------REMOVED-------------
                `);
                return foundProductById;
            } 

        } catch (error) {
            throw new Error(error)
        }

    }
}

const manager = new ProductManager('Products.json')

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









// Se creará una instancia de la clase “ProductManager”
// const productManager1 = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// console.log(productManager1.getProducts());

// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// productManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// console.log(productManager1.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// productManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
// console.log(productManager1.getProductById(5));
// console.log(productManager1.getProductById(1));



