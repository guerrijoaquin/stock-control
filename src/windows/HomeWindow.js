const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');

module.exports = function HomeWindow(windows){

    let window = new BrowserWindow({
        width: 900,
        height: 800,
        minWidth: 600,
        minHeight: 400,
        backgroundColor: 'white',
        show: false,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavascript: false,
            contextIsolation: true,
            preload: path.join(__dirname, '..', 'helpers', 'preload.js')
        },
        icon: path.join(__dirname, '..', 'assets', 'icon.ico')
    });

    window.setMenu(Menu.buildFromTemplate([
        {
            label: 'Información y Ayuda',
            click: windows.Info
        }
    ]));

    ipcMain.on('reloadHomePage', () => window.reload())

    window.on('close', e => app.quit());

    window.loadURL(`file://${path.join(__dirname, '..', 'ui', 'index.html')}?page=HomePage`);

    window.once('ready-to-show', () => window.show());

    return window;

}
