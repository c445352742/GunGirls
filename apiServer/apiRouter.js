const router = require('express').Router();

module.exports = function (db) {
  router.get('/', function (req, res, next) {
    let a = db.get("login")
    console.log(db.get("login"))
    console.log('{a:1}')
    res.send({ status: "success", data: a });
  })
  return router;
};