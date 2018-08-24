const electron = require('electron');
const {
  app, // 控制应用生命周期的模块
  BrowserWindow, // 创建原生浏览器窗口的模块
  dialog, //对话框
  Menu //菜单
} = electron;
// if (require('electron-squirrel-startup')) return;
const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
// license check
const crypto = require('crypto');
const fs = require('fs');

const svr = require('./apiServer/server.js');
if ('--dev' !== process.argv[2]) { svr(9000); console.log('api is running') }

// db open
let DB = require('./apiServer/db.js')
DB.open('admin','admin1');

// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

function createWindow() {
  let menu = Menu.buildFromTemplate([{
    label: 'Operate',
    submenu: [
      { label: 'FullScreen', role: 'togglefullscreen', accelerator: 'F4' },
      { label: 'Reload', role: 'Reload' },
      { label: 'Force Reload', role: 'Force Reload', accelerator: 'F5' },
      { label: 'DevTools', role: 'toggledevtools', accelerator: 'F10' },
      { label: 'Copy', role: 'copy', accelerator: 'CommandOrControl+c' },
      {
        label: 'Exit', accelerator: 'Esc', click: function () {
          dialog.showMessageBox({
            type: 'warning',
            message: '警告',
            detail: '您确定退出吗？',
            buttons: ['退出', '取消'],
            modal: true,
          }, function (index) {
            if (index == 0)
              myQuit();
          })
        }
      }
    ]
  }]);
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 1280, height: 720,
    autoHideMenuBar: false,
    // frame: false,
    maximizable: false,
    fullscreen: false,
    webPreferences: { devTools: ('--dev' == process.argv[2]) || false },
    fullscreenable: true,
    alwaysOnTop: false,
    show: false,
    resizable: false,
  });

  // 缩放设置
  mainWindow.once('ready-to-show', function () {
    mainWindow.show();
    mainWindow.webContents.openDevTools();
    // mainWindow.webContents.setZoomFactor(license.GUI.zoomLevel);
  });

  // and load the index.html of the app.
  if ('--dev' == process.argv[2]) {
    mainWindow.loadURL(url.format({
      pathname: '127.0.0.1:8989',
      protocol: 'http:',
      slashes: true
    }));
  } else {
    mainWindow.loadURL(url.format({
      pathname: '127.0.0.1:9000',
      protocol: 'http:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    myQuit();
  });
}

app.on('ready', createWindow);

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('sendCmd', function (event, arg) {
  console.log(arg)
  event.sender.send('getCmd','pong');
});

function myQuit() {
  DB.close();
  app.quit();
}