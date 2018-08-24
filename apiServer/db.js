const fs = require("fs");
const path = require("path");
function DB() {
  let self = this;
  self.data = null;
  self.id = null;
  self.illegal = true;
  // 打开
  self.open = function (name, pwd) {
    console.log('open database')
    fs.readFile(path.join(__dirname, '/storage.json'), function (err, data) {
      if (err) {
        // 无目标文件
        if (err.errno === -2) {
          console.error(err.errno + ' empty original file, creating...');
          // 初始化结构体
          let data = {
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

      // 用户验证
      self.data.userList.forEach(ele => {
        if (ele.name === name && ele.pwd === pwd) {
          self.illegal = false;
          self.id = ele.id;
          console.log('logged in');
        }
      });
      // 用户登陆错误响应
      if (self.illegal) {
        console.log('wrong account');
      };
    });
  }

  // 写
  self.set = function () {
    if (self.illegal) return;
    self.update();
  }

  // 读
  self.get = function () {
    if (self.illegal) return;
  }

  // 更新文件
  self.update = function () {
    if (self.illegal) return;
    fs.writeFileSync(path.join(__dirname, '/storage.json'), JSON.stringify(self.db), function (err) {
      if (err) console.log(err)
      else console.log('write database done.');
    })
  }

  // 关闭
  self.close = function () {
    if (self.illegal) { console.log('closing without save'); return; }
    console.log('closing')
    self.update();
  }

}
module.exports = new DB;