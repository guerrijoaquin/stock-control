const path = require('path');
const { BrowserWindow, ipcMain } = require('electron');

module.exports = function ShowProductWindow(parent, product) {

    if (product.code == null) product.code = "";
    if (product.sku == null) product.sku = "";

    let window = new BrowserWindow({
        width: 400,
        height: 550,
        resizable: false,
        backgroundColor: 'white',
        parent: parent,
        modal: true,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavascript: false,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, '..', 'helpers', 'preload.js')
        },
        icon: path.join(__dirname, '..', 'assets', 'icon.ico')
    });

    window.setMenu(null);

    ipcMain.once('closeShowProductWindow', () => window.destroy());

    const productData = `pId=${product.id}&pName=${product.name}&pStock=${product.stock}&pCode=${product.code}&pSku=${product.sku}`;
    window.loadURL(`file://${path.join(__dirname, '..', 'ui', 'index.html')}?page=ShowProductPage&${productData}`);

    window.once('ready-to-show', () => window.show())
    
    return window;
}
