const fs = require("fs");
const path = require("path");
function DB() {
  let self = this;
  let temp = true;
  self.data = null;
  self.equip = require('./data/equip.js');
  self.id = null;
  self.illegal = false;

  // 打开
  self.open = function () {
    console.log('open database')
    // 初始化结构体
    let dataIni = {
      "userList": [],
      "personal": {}
    }
    fs.readFile(path.join(__dirname, '/data/storage.json'), function (err, data) {
      if (err) {
        // 无目标文件
        if (err.errno === -2) {
          console.error(err.errno + ' empty original file, creating...');
          // 写入结构体
          fs.writeFileSync(path.join(__dirname, '/data/storage.json'), JSON.stringify(dataIni), function (err) {
            console.log('test')
            if (err) { throw err }
          })
          console.log('write database done.');
          temp && self.open();
          temp = false;
        } else {
          // 其他错误直接中断
          self.illegal = true;
          console.log(err + ' \r\nopen failed. please check ')
          return;
        }
      }
      else {
        if (data.indexOf('userList') >= 0) {
          // 获取数据
          self.illegal = false;
          self.data = JSON.parse(data);
        }
        else {
          // 写入结构体
          fs.writeFileSync(path.join(__dirname, '/data/storage.json'), JSON.stringify(dataIni), function (err) {
            console.log('test')
            if (err) { throw err }
          })
          console.log('write database done.');
        }
      }
    });
  }

  // 写
  self.set = function () {
    if (self.illegal) {
      return 'database illegal, please check';
    }
    //"personal":        
    //  "admin": {
    //   "package": [
    //     {
    //       "id": 0,
    //       "name": "admin",
    //       "amount": 1
    //     }
    //   ]
    // }
    self.update();
  }

  self.create = function (param, callback) {
    //accept [param] object with two parameters, name&passwrod
    //callback only executed when failed
    if (self.illegal) {
      return 'database illegal, please check';
    }
    // check already exist account
    for (let i in self.data.userList) {
      if (self.data.userList[i].name === param.name) {
        callback && callback('account already exist');
        return;
      }
    }

    if (param.name && param.pwd) {
      self.data.userList.push({
        id: Date.parse(new Date()) + '#' + (Math.random() * 100000).toString().substr(0, 5),
        name: param.name,
        pwd: param.pwd,
        createTime: new Date().toString()
      })
      self.data.personal[param.name] = {
        info: 0,
        package: []
      }

      if (!self.update()) {
        callback && callback('save error');
      }
    }
  } 

  // 读
  self.get = function (argv) {
    if (self.illegal) {
      return 'database illegal, please check';
    }
    if (argv.cmd === "login") {
      return self.data.userList;
    }
    if (argv.cmd === "package") {
      console.log(self.data.personal)
      console.log(argv.user)
      return self.data.personal[argv.user].package;
    }
    if (argv.cmd === "info") {
      return self.data.personal[argv.user].info;
    }
    return "unexpected param";
  }

  // 更新文件
  self.update = function () {
    if (self.illegal) {
      return 'database illegal, please check';
    }
    let err = false;
    fs.writeFileSync(path.join(__dirname, '/data/storage.json'), JSON.stringify(self.data), function (err) {
      if (err) { err = true; console.log(err) }
      else console.log('write database done.');
    })
    return !err;
  }

  // 关闭
  self.close = function () {
    if (self.illegal) {
      return 'database illegal, please check';
    }
    console.log('closing')
    self.update();
  }

}
module.exports = new DB;