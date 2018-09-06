const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const router = require('./apiRouter')(db);
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyparser = require('body-parser');
const multer = require('multer');

// set mode engine
app.set('views', path.join(__dirname, '../dist'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));

// resolve router
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", '3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));
// cross origion

app.use(session({
  name: 'sessionKey',
  secret: 'mysigniture',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: true,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 3600 * 1000  // 有效期，单位是毫秒
  }
}));
app.use('/api', router);
app.get('/notLicensed', function (req, res) {
  res.render(path.resolve(__dirname, 'noneLicensed'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log((err))
  res.send(err.message);
});

function server() {
  let server = http.createServer(app);
  this.ini = function (port) {
    server.listen(port || 9000, '127.0.0.1', function () {
      db.open('admin', 'admin')
      let addr = server.address().address;
      let port = server.address().port
      console.log('Api Server is Listening on ' + addr + ':' + port);
    });
  }
  this.quit = function () {
    db.close();
  }
}
module.exports = new server;