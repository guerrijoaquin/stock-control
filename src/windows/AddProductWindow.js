const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');

module.exports = function AddProductWindow(parent) {

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

    ipcMain.once('closeAddProductWindow', () => window.destroy());

    window.loadURL(`file://${path.join(__dirname, '..', 'ui', 'index.html')}?page=AddProductPage`);

    window.once('ready-to-show', () => window.show())

    return window;
}