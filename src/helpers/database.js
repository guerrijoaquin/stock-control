const sqlite3 = require('sqlite3').verbose();
const { ipcMain, app } = require('electron');
const path = require('path');
const knex = require('knex')({
    client: 'sqlite3', 
    connection: {
        filename: 'database.db'
    },
    useNullAsDefault: true
});

function createDatabase(){

    const db = new sqlite3.Database('database.db', (err) => {
        
        if (err) return console.log(err)

        console.log('DB Connection Successful');

        db.run('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, name TEXT, stock INTEGER, code INTEGER, sku TEXT)');
        
    });

    //Listen for requests
    ipcMain.handle('saveProduct', async (event, data) => await saveProduct(data))
    ipcMain.handle('getProducts', async () => await getProducts())
    ipcMain.handle('searchProducts', async (event, query) => await searchProducts(query))
    ipcMain.handle('updateProduct', async (event, product) => await updateProduct(product))
    ipcMain.handle('deleteProduct', async (event, id) => await deleteProduct(id))

}

async function saveProduct(data, callback){

    let result = await knex('products').insert(data);
    return Boolean(result);
    
}

async function getProducts(){

    return await knex('products')

}

async function searchProducts(query){

    return await knex('products').where('name', 'like', `%${query}%`).orWhere('sku', 'like', `%${query}%`)

}

async function updateProduct(product){

    let result = await knex('products').where('id', product.id).update(product)
    return result == 1;

}

async function deleteProduct(id){

    let result = await knex('products').where('id', id).del();
    return result == 1;

}

module.exports = {
    createDatabase: createDatabase,
    saveProduct: saveProduct,
    getProducts: getProducts,
    searchProducts: searchProducts,
    updateProduct: updateProduct
}



