import fs from 'fs/promises'
import { existsSync } from 'fs';

class CartManager {
    constructor(path) {
        this.path = path
    }

    async readFile() {
        return await fs.readFile(this.path, 'utf-8');
    }

    async writeFile(string) {
        return await fs.writeFile(this.path, string, 'utf-8');
    }

    async getCarts() {
        try {
            if (existsSync(this.path)) {
                const dataCarts = await this.readFile();
                const carts = JSON.parse(dataCarts);
                return carts;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async addCart() {
        try {
            const carts = await this.getCarts();
            const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
            const newCart = {
                id: id,
                products: []
            };
            carts.push(newCart);
            const cartString = await JSON.stringify(carts, null, "\t");
            await this.writeFile(cartString);
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProduct(idCart, idProduct) {
        try {
            const carts = await this.getCarts();
            const cart = await this.getCartById(idCart);
            const productIndex = cart.products.findIndex(prod => prod.product === idProduct);
            if (productIndex === -1) {
                cart.products.push({
                    product: idProduct,
                    quantity: 1
                })
            }
            else {
                cart.products[productIndex].quantity++
            }
            const cartIndex = carts.findIndex(item => item.id === cart.id)
            carts[cartIndex] = cart
            const cartString = await JSON.stringify(carts, null, "\t");
            await this.writeFile(cartString);

            return cart;


        } catch (error) {
            throw new Error(error);
        }
    }


    async getCartById(idCart) {

        try {
            const carts = await this.getCarts();
            const foundCart = carts.find(element => element.id === idCart);
            if (foundCart) {
                return foundCart;
            } else {
                console.log(`-----------------------
                    Product not found from getCartById
                    ------------------------`)
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateCart(idCart, newProperties) {
        const carts = await this.getCarts();
        const foundCartById = await this.getCartById(idCart);

        const cartUpdated = { ...foundCartById, ...newProperties };

        const replacedCartList = carts.map(cart => {
            if (cart.id === cartUpdated.id) {
                return cartUpdated;
            } else {
                return cart;
            }
        });

        const stringProductsList = await JSON.stringify(replacedCartList, null, "\t");

        await this.writeFile(stringProductsList);


    }

    // async deleteProduct(idProduct) {
    //     try {
    //         const products = await this.getProducts();
    //         const foundProductById = await this.getProductById(idProduct);
    //         if (foundProductById) {
    //             const foundIndex = products.findIndex(product => product.id === foundProductById.id);

    //             products.splice(foundIndex, 1);

    //             const stringProductsList = await JSON.stringify(products, null, "\t");

    //             await this.writeFile(stringProductsList);
    //             console.log(`
    //             ------------------REMOVED-------------
    //             `);
    //             return foundProductById;
    //         }

    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }
}

export default CartManager 