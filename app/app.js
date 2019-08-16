var express = require('express');
var app = express();
var http = require('http');

var bookFile = require('./data/books.json');
var io = require('socket.io')();

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

// *** server config *** //
var server   = http.createServer(app);
server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

function stop() {
  server.close();
}

io.attach(server);
io.on('connection', function(socket) {
  socket.on('postMessage', function(data) {
    io.emit('updateMessages', data);
  });
});

module.exports = app
module.exports.stop = stop;