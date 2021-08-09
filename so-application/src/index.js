const { app, BrowserWindow, Menu } = require('electron');
const sound = require("sound-play");
const url = require('url');
const path = require('path');

// Here we are calling electron-reload only when the app is in development.
//That's mean that if you are using the final app in production, you don't need to.
if(process.env.NODE_ENV === 'development') {
    require('electon-reload')(__dirname,{
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

//Here we define the server that the application will use to get and post data.
const server = 'http://complejotest.hopto.org:10/signin';

//This is the main window of the app.
let mainWindow;

//When the app is ready, do the code below.
app.on('ready', () => {
    //Create the main window.
    mainWindow = new BrowserWindow({
            width: 1366,
            height: 820,
            resizable: false,
            frame: false,
            show: false,
            });

    //Load the content of the app when the app is ready.
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    //This code will render the app loaded from the server in the main window.
    mainWindow.loadURL(server);

});
