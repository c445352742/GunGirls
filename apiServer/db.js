const fs = require("fs");
const path = require("path");
function DB() {
  let self = this;
  self.data = null;
  self.euqip = require('./data/equip.js');
  self.id = null;
  // 打开
  self.open = function (name, pwd) {
    console.log('open database')
    fs.readFile(path.join(__dirname, '/storage.json'), function (err, data) {
      if (err) {
        // 无目标文件
        if (err.errno === -2) {
          console.error(err.errno + ' empty original file, creating...');
          // 初始化结构体
          let data = {}
          // 写入结构体
          fs.writeFileSync(path.join(__dirname, '/storage.json'), JSON.stringify(data), function (err) {
            if (err) console.log(err)
            else console.log('write database done.');
          })
        }
        // 其他错误直接中断
        return;
      }
      // 获取数据
      self.data = JSON.parse(data);
    });
  }

  // 写
  self.set = function () {
    // "userList": [
    //   {
    //     "id": 0,
    //     "name": "admin",
    //     "pwd": "admin",
    //     "packName":"a",
    //     "createTime": "Fri Aug 24 2018 16:25:09 GMT+0800 (CST)"
    //   }
    // ],
    // "package":{
    //   "a":[{
    //     "id":0,
    //     "name":"admin",
    //     "amount":1
    //   }]
    // }
    self.update();
  }

  // 读
  self.get = function (str) {
    let s = undefined;
    if (str === "login") {
      s = self.data.userList;
      return JSON.stringify(s);
    }
    return "unexpected param";
  }

  // 更新文件
  self.update = function () {
    fs.writeFileSync(path.join(__dirname, '/storage.json'), JSON.stringify(self.db), function (err) {
      if (err) console.log(err)
      else console.log('write database done.');
    })
  }

  // 关闭
  self.close = function () {
    console.log('closing')
    self.update();
  }

}
module.exports = new DB;