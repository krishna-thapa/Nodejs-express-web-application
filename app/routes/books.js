var express = require('express');
var router = express.Router();

router.get('/books', function(req, res) {
  var data = req.app.get('bookData');
  var bookPhotos = [];
  var volBooks = data.books;

  data.books.forEach(function(book) {
    bookPhotos = bookPhotos.concat(book.picture);
  });

  res.render('books', {
    pageTitle: 'Books',
    picture: bookPhotos,
    books: volBooks,
    pageID: 'bookList'
  });
});

router.get('/books/:bookid', function(req, res) {
  var data = req.app.get('bookData');
  var coverPhotos = [];
  var volBooks = [];

  data.books.forEach(function(book) {
    if (book.shorttitle == req.params.bookid) {
      volBooks.push(book);
      coverPhotos = coverPhotos.concat(book.picture);
    }
  });

  res.render('books', {
    pageTitle: 'BookInfo',
    picture: coverPhotos,
    books: volBooks,
    pageID: 'BookInfo'
  });
});

module.exports = router;
