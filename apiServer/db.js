const fs = require("fs");
const path = require("path");
function db() {
  let self = this;
  self.db = null;
  self.id = null;
  self.illegal = true;
  self.fileExist = true;
  // 打开
  self.open = function (name, pwd) {
    console.log('open database')
    fs.readFileSync(path.join(__dirname, '/storage.json'), function (err, data) {
      if (err) {
        // 无目标文件
        if (err.errno === -2) {
          console.error(err.errno + ' empty original file, creating...');
          // 文件存在标志
          self.fileExist = false;
          // 初始化结构体
          let db = {
            "occupation": false,
            "maxId": 0,
            "userList": [{
              "id": 0,
              "name": "admin",
              "pwd": "admin",
              "createTime": new Date().toString()
            }],
            "tables": {}
          }
          // 写入结构体
          fs.writeFileSync(path.join(__dirname, '/storage.json'), JSON.stringify(db), function (err) {
            if (err) console.log(err)
            else console.log('write database done.');
          })
        }
        // 其他错误直接中断
        return;
      }
      // 获取数据
      self.db = JSON.parse(data);
      // 用户验证
      let loggedIn = false;
      self.db.userList.forEach(ele => {
        if (ele.name === name && ele.pwd === pwd) {
          loggedIn = true;
          self.id = ele.id;
          break;
        }
      });
      // 用户登陆错误响应
      if (!loggedIn) {
        console.log('wrong account');
        return;
      };
      // 文件占用
      if (!self.db.occupation) {
        self.db.occupation = true;
        self.illegal = false;
        self.update();
      } else {
        console.log('file is in use');
        return;
      }
    });
  }

  // 写
  self.set = function () {
    if (illegal) return;
    self.update();
  }

  // 读
  self.get = function () {
    if (illegal) return;
  }

  // 更新文件
  self.update = function () {
    if (illegal) return;
    fs.writeFileSync(path.join(__dirname, '/storage.json'), JSON.stringify(self.db), function (err) {
      if (err) console.log(err)
      else console.log('write database done.');
    })
  }

  // 关闭
  self.close = function () {
    if (illegal) return;
    console.log('closing')
    self.update();
  }

}
module.exports = new db;