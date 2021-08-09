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

//Server URL
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
            });
    //This code will load the HTML file called index.html to render the visual of the app.
    mainWindow.loadURL(server);

});
