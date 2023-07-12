class ProductManager {
    static idCounter = 0;
    constructor() {
        this.products = [];
    }

    /* 
        addProduct
    - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
    - Al agregarlo, debe crearse con un id autoincrementable
    */
    addProduct(title, description, price, thumbnail, code, stock) {

        if (!(title && description && price && thumbnail && code && stock)){ 
            console.error("Incomplete data");
            return;            
        }
        const foundCode = this.products.find( product => product.code === code);
        if (!foundCode) {
            console.warn("Repeated code")
            return;
        } 

        if (!products.length) {
            ProductManager.idCounter = 1;
        } else {
            ProductManager.idCounter = products[products.length -1] + 1;            
        }

        const newProduct = {
            id: ProductManager.idCounter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        
        this.products.push(newProduct);
    }

    /* 
        getProducts
    - Debe devolver el arreglo con todos los productos creados hasta ese momento
    */
    getProducts() {
        return this.products;
    }

    /*
        getProductById
    - Debe buscar en el arreglo el producto que coincida con el id
    - En caso de no coincidir ningún id, mostrar en consola un error “Not found”
    */ 
    getProductById(idProduct) {
        const foundId = this.products.find( product => product.id === idProduct);
        if (!foundId) {
            console.error("Not found");
            return;
        } 
        return foundId;
    }
}

const productManager1 = new ProductManager();