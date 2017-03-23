var express = require('express');
var router = express.Router();
var path = require('path');
router = function (app) {
  app.get('/', function (req, res, next) {
    res.render(path.join(__dirname , '../../client/app/index'));

  });
};
module.exports = router;

