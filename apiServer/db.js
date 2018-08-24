const fs = require("fs");
const path = require("path");
function DB() {
  let self = this;
  self.db = null;
  self.id = null;
  self.illegal = true;
  // 打开
  self.open = function (name, pwd) {
    console.log('open database')
    fs.readFileSync(path.join(__dirname, '/storage.json'), function (err, data) {
      console.log('err')
      console.log(data)
      console.log(err)
      console.log('err end')
      if (err) {
        // 无目标文件
        if (err.errno === -2) {
          console.error(err.errno + ' empty original file, creating...');

          // 初始化结构体
          let db = {
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
        console.log(err);
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
          return;
        }
      });
      // 用户登陆错误响应
      if (!loggedIn) {
        console.log('wrong account');
        return;
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
    if (self.illegal) return;
    console.log('closing')
    self.update();
  }

}
module.exports = new DB;