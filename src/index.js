'use babel';

import app from 'app'
import Menu from 'menu'
import MenuItem from 'menu-item'
import BrowserWindow from 'browser-window'

require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    width: 1020,
    height: 640,
    'min-width': 1020,
    'min-height': 640,
    frame: true
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

});
