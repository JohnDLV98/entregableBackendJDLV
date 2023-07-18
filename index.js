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

        if (!(title && description && price && thumbnail && code && stock)) {
            console.error("Incomplete data");
            return;
        }
        const foundCode = this.products.find(product => product.code === code);
        if (foundCode) {
            console.warn("Repeated code")
            return;
        }

        ProductManager.idCounter++;

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
        const foundId = this.products.find(product => product.id === idProduct);
        if (!foundId) {
            return "ERROR, Not found";
        }
        return foundId;
    }
}

// Se creará una instancia de la clase “ProductManager”
const productManager1 = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager1.getProducts());

// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
productManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager1.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(productManager1.getProductById(5));
console.log(productManager1.getProductById(1));



