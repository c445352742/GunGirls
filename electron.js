const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function() {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // 加载应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // 打开开发工具
  mainWindow.openDevTools();

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function() {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });
});
// // Module for squirrel to handle installer
// if (require('electron-squirrel-startup')) return;

// // Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow;
// const path = require('path');
// const url = require('url');
// const ipc = electron.ipcMain;
// // license check
// const crypto = require('crypto');
// const fs = require('fs');

// // const edge = require('electron-edge-js');

// // const server = require('./server');
// // server();

// // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
// var mainWindow = null;

// app.on('ready', createWindow);

// app.on('activate', function () {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

// ipc.on('close', function () {
//   app.quit();
// });

// app.on('window-all-closed', function () {
//   app.quit()
// })

// function createWindow() {
//   let licenseActivate = check();
//   console.log('console');
// console.log(process.env.NODE_ENV);
//   if (licenseActivate == 'true') {
//     mainWindow = new BrowserWindow({
//       // width: 800, height: 600,
//       autoHideMenuBar: false,
//       // frame: false,
//       maximizable: true,
//       fullscreen: !license.GUI.normalWindow||null,
//       alwaysOnTop: license.GUI.topMost||null,
//       show: false,
//       resizable: license.GUI.resizable,
//     });
//     // and load the index.html of the app.
//     mainWindow.loadURL(url.format({
//       pathname: '127.0.0.1:8989',
//       protocol: 'http:',
//       slashes: true
//     }));
//   } else {
//     mainWindow = new BrowserWindow({
//       width: 1280, height: 720,
//       autoHideMenuBar: false,
//       // frame: false,
//       maximizable: true,
//       fullscreen: false,
//       alwaysOnTop: true,
//       show: false,
//       resizable: false,
//     });
//     // and load the index.html of the app.
//     mainWindow.loadURL(url.format({
//       pathname: '127.0.0.1:8989/noneLicensed',
//       protocol: 'http:',
//       slashes: true
//     }));
//   }

//   // 缩放设置
//   mainWindow.once('ready-to-show', function () {
//     // mainWindow.show();
//     // mainWindow.webContents.setZoomFactor(license.GUI.zoomLevel);
//   });
//   mainWindow.setMenu(null);

//   electron.globalShortcut.register('f5', function () {
//     mainWindow.reload();

//     if (licenseActivate == 'true') {
//       mainWindow.loadURL(url.format({
//         pathname: '127.0.0.1:8989',
//         protocol: 'http:',
//         slashes: true
//       }));
//     }else{
//       mainWindow.loadURL(url.format({
//         pathname: '127.0.0.1:8989/noneLicensed',
//         protocol: 'http:',
//         slashes: true
//       }));
//     }
//   });

//   electron.globalShortcut.register('f11', function () {
//     mainWindow.webContents.toggleDevTools();
//   });
//   electron.globalShortcut.register('Esc', function () {
//     dialog.showMessageBox({
//       type: 'warning',
//       message: '警告',
//       detail: '您确定退出吗？',
//       buttons: ['退出', '取消'],
//       modal: true,
//     }, function (index) {
//       if (index == 0)
//         app.quit();
//     })
//   });

//   // Emitted when the window is closed.
//   mainWindow.on('closed', function () {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null;
//     app.quit();
//   })
// }

// function check() {
// //   let key = 'a;sfdsa';
// //   let ret = 'true';
// //   // 加密内容核对
// //   let hex = crypto.createHmac('sha256', key).update(license.permission.lastLogin + license.permission.expireDate).digest('hex');
// //   if (license.permission.code != hex) {
// //     return 'wrong code';
// //   }

// //   // 授权期限核对
// //   let o = (new Date(license.permission.lastLogin));
// //   let d = (new Date(license.permission.expireDate));
// //   if (d > (new Date()) && (new Date()) > o) {
// //     license.permission.lastLogin = (new Date()).toLocaleString();
// //   }
// //   else {
// //     if ((new Date()).toLocaleString() > o) {
// //       license.permission.lastLogin = (new Date()).toLocaleString();
// //     }
// //     ret = 'expired';
// //   }

// //   // 生成校验
// //   license.permission.code = crypto.createHmac('sha256', key).update(license.permission.lastLogin + license.permission.expireDate).digest('hex');

// //   // 写文件
// //   fs.writeFile('License.json', JSON.stringify(license), function (err) {
// //     if (err) {
// //       console.log(err);
// //       app.quit();
// //     }
// //     else console.log('write license done');
// //   });

// //   return ret;
// return true;
// }