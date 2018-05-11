const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

// set mode engine
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'dist'));

// cross origion
// app.all('*', function(req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   // res.header("X-Powered-By",' 3.2.1')
//   // res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// resolve router
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/api', function (req, res) {
  res.send('index1');
});
app.get('/', function (req, res) {
  res.render('index');
});
app.get('/noneLicensed', function (req, res) {
  res.render(path.resolve(__dirname, 'noneLicensed'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = function server(port) {
  let server = http.createServer(app);
  server.listen(port || 9000, '127.0.0.1', function () {
    let addr = server.address().address;
    let port = server.address().port
    console.log('Api Server is Listening on ' + addr + ':' + port);
  });
}