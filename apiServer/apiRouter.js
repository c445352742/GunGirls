const router = require('express').Router();

module.exports = function (db) {
  router.post('/login', function (req, res, next) {
    console.log(req.body)
    res.send({status:'success',data:'done'})
  })
  return router;
};