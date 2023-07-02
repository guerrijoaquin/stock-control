const path = require('path');
const { BrowserWindow, ipcMain } = require('electron');

module.exports = function InfoWindow(parent) {

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

    ipcMain.once('closeInfoPage', () => window.destroy());

    window.loadURL(`file://${path.join(__dirname, '..', 'ui', 'index.html')}?page=InfoPage`);

    window.once('ready-to-show', () => window.show())

    return window;
}