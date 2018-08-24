const router = require('express').Router();
const db = require('./db')

router.get('/', function (req, res, next) {
  res.send({ a: db.maxId });
})

module.exports = { router: router, db: db };