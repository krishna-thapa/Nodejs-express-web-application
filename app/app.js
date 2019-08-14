var express = require('express');
var app = express();

var bookFile = require('./data/books.json');
var io = require('socket.io')();

app.set('port', process.env.PORT || 3000 );
app.set('bookData', bookFile);

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Top 8 Books';
app.locals.allBooks = bookFile.books;

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/books'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));
app.use(require('./routes/chat'));

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

io.attach(server);
io.on('connection', function(socket) {
  socket.on('postMessage', function(data) {
    io.emit('updateMessages', data);
  });
});

