const router = require('express').Router();


module.exports = function (db) {
  router.get('/', function (req, res, next) {
    res.send({status:'success',data:'s'})
  })
  router.post('/login', function (req, res, next) {
    console.log(req.body)
    res.send({status:'success',data:'s'})
  })

  return router;
};