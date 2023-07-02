const path = require('path');

//Create database.
require('./src/helpers/database').createDatabase();

//App Flow code.
require('./src/appFlow')();

//If is in development use electron-reload for auto refresh.
if (!require('electron').app.isPackaged)
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
