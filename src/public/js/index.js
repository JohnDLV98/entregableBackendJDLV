const socketClient = io();

const frmProduct = document.getElementById('frmProducts');
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const thumbnail = document.getElementById('thumbnail');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const allProductsTable = document.getElementById('allProductsTable')

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

    socketClient.emit("postProduct", newProduct);
    
    title.value = '';
    description.value = '';
    code.value = '';
    thumbnail.value = '';
    price.value = '';
    stock.value = '';
    category.value = '';
}

socketClient.on('postProductTable', (allProducts) => {
    try {
        const newRow = `
                    <tr>
                        <td>${allProducts.id}</td>
                        <td>${allProducts.title}</td>
                        <td>${allProducts.description}</td>
                        <td>$ ${allProducts.price}</td>
                        <td>${allProducts.thumbnail || 'thumbnail not found'}</td>
                        <td>${allProducts.code}</td>
                        <td>${allProducts.stock}</td>                        
                        <td>${allProducts.category}</td>   
                        <td><input type="submit" value="DELETE"></td>
                    </tr>
                    `
        allProductsTable.innerHTML += newRow;
    } catch (error) {
        console.log(`ERROR INDEX.JS POST_PRODUCT_TABLE ${error}`);
    }
})


