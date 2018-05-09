const chalk = require('chalk');
const cp = require('child_process');
let exec = cp.exec;

// 查询mac端口 lsof -i tcp:8992

var devSvr = exec('cd ' + __dirname + '/../vue&&npm run devVue', function (error, stdout, stderr) {
  if (error) {
    console.error('error: ' + error);
    return;
  }
  console.log(stdout);
});
devSvr.stdout.on('data', function (msg) {
  console.log(msg);
})
devSvr.stderr.on('data', function (msg) {
  console.log(chalk.yellow(msg));
})
devSvr.on('exit', function () {
  console.log('exit devSvr');
});

let ele = exec('./node_modules/.bin/electron . --dev', function (error, stdout, stderr) {
  if (error) {
    console.error('error: ' + error);
    return;
  }
  console.log(stdout);
});
ele.stdout.on('data', function (msg) {
  console.log(msg);
})
ele.on('exit', function () {
  console.log('exit ele');
});