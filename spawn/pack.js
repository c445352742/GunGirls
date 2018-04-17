const e = require('electron-packager');
const path = require('path');
const chalk = require('chalk');
console.log(chalk.yellowBright('The packager will generate package in 4 minutes without any output, please do not break the processing procedure\n'));


let options = {
  arch: 'ia32',
  name: "ATM",
  asar: {
    unpackDir: 'dist'
  },
  // asar:false,
  dir: path.join(__dirname, '../'),
  icon: path.join(__dirname, '../static/logo.ico'),
  ignore: /^\/(build|installer|config|\.[a-z]+|README|static|src)/,
  out: path.join(__dirname, '../out'),
  overwrite: true,
  platform: 'win32'
}
e(options, function (err, appPaths) {
  if (err) {
    console.log(chalk.redBright(err + '\n'));
  } else {
    console.log(appPaths);
  }
});