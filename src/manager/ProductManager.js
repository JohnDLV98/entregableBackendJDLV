import fs from 'fs/promises'
import { existsSync } from 'fs';

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

export default ProductManager 