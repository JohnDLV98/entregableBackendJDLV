const socketClient = io();

const frmProduct  = document.getElementById('frmProducts');
const title  = document.getElementById('title');
const description  = document.getElementById('description');
const code  = document.getElementById('code');
const thumbnail  = document.getElementById('thumbnail');
const price  = document.getElementById('price');
const stock  = document.getElementById('stock');
const category  = document.getElementById('category');



frmProduct.onsubmit = (e) => {
    e.preventDefault();
    const newProduct = {
        title: title.value,
        description: description.value,
        code: code.value,
        thumbnail: thumbnail.value,
        price: +price.value,
        stock: +stock.value,
        category: category.value
    }
    console.log(`desde cliente ${newProduct}`);
    socketClient.emit("postProduct", newProduct);
       
}



