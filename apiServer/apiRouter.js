const router = require('express').Router();


module.exports = function (db) {
  router.post('/login', function (req, res, next) {
    req.session.userName = req.body.name; // 登录成功，设置 session
    res.send({status:'success',data:{}})
  })
  router.post('/register', function (req, res, next) {
    req.session.userName = req.body.name; // 登录成功，设置 session
    db.set({
      
    })
    res.send({status:'success',data:{}})
  })

  return router;
};