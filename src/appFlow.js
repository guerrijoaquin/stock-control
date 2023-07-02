const { app, ipcMain } = require('electron');

const HomeWindow = require('./windows/HomeWindow');
const AddProductWindow = require('./windows/AddProductWindow');
const ShowProductWindow = require('./windows/ShowProductWindow');
const InfoWindow = require('./windows/InfoWindow');

module.exports = async function App(){

    let homePageWindow;
    app.on('ready', () => homePageWindow = HomeWindow({
        Info: InfoWindow
    }))
    
    //Listeners for open windows when they are called
    ipcMain.on('AddProductWindow', () => AddProductWindow(homePageWindow))
    ipcMain.on('ShowProductWindow', (event, product) => ShowProductWindow(homePageWindow, product))
    
}