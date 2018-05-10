const electron = require('electron');
const {
  app, // 控制应用生命周期的模块
  BrowserWindow, // 创建原生浏览器窗口的模块
  dialog
} = electron;
// if (require('electron-squirrel-startup')) return;
const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
// license check
const crypto = require('crypto');
const fs = require('fs');
const svr = require('./server.js');
if ('dev' != process[2]) svr(9000);
// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280, height: 720,
    autoHideMenuBar: false,
    // frame: false,
    maximizable: false,
    fullscreen: false,
    alwaysOnTop: false,
    show: true,
    resizable: false,
  });
  // and load the index.html of the app.
  if (process.argv[2]) {
    mainWindow.loadURL(url.format({
      pathname: '127.0.0.1:8989',
      protocol: 'http:',
      slashes: true
    }));
  } else {
    mainWindow.loadURL(url.format({
      pathname: 'localhost:9000',
      protocol: 'http:',
      slashes: true
    }));
  }

  // 缩放设置
  mainWindow.once('ready-to-show', function () {
    mainWindow.show();
    // mainWindow.webContents.setZoomFactor(license.GUI.zoomLevel);
  });

  mainWindow.setMenu(null);

  electron.globalShortcut.register('f5', function () {
    mainWindow.reload();
  });

  electron.globalShortcut.register('f10', function () {
    mainWindow.webContents.toggleDevTools();
  });
  electron.globalShortcut.register('Esc', function () {
    dialog.showMessageBox({
      type: 'warning',
      message: '警告',
      detail: '您确定退出吗？',
      buttons: ['退出', '取消'],
      modal: true,
    }, function (index) {
      if (index == 0)
        app.quit();
    })
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    app.quit();
  });
}

app.on('ready', createWindow);

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('close', function () {
  app.quit();
});

app.on('window-all-closed', function () {
  app.quit()
})