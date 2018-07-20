const router = require('express').Router();

router.get('/', function (req, res, next) {
  res.send({ a: 'index1' });
})

module.exports = router;
