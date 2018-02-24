var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var bdata = req.app.get('bookData');
  var bookPhotos = [];
  var volBooks = bdata.books;

  bdata.books.forEach(function(book){
    bookPhotos = bookPhotos.concat(book.picture);
  });

  res.render('index', {
    pageTitle: 'Home',
    picture: bookPhotos,
    books: volBooks,
    pageID: 'home'
  });

});

module.exports = router;
