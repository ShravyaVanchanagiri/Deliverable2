var express = require('express');
var router = express.Router();
var path = require('path');
var postRoutes = require('./postRoutes');
router = function (app) {
  app.get('/', function (req, res, next) {
    res.render(path.join(__dirname , '../../client/app/index'));

  });
  app.get('/getAllPosts',postRoutes.getAllPosts);
  app.get('/getSelectedPost/:id',postRoutes.getSelectedPost);
  app.post('/addComment',postRoutes.addComment);
  app.post('/addLike',postRoutes.addLike);
  app.delete('/removeLike',postRoutes.removeLike);
};
module.exports = router;

