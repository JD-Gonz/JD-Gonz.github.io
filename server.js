var express = require('express');

var server = express();
server.use('/views', express.static(__dirname + '/public/views'));
server.use('/img', express.static(__dirname + '/public/img'));
server.use('/css', express.static(__dirname + '/public/css'));
server.use('/js', express.static(__dirname + '/public/js'));

server.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname });
});

var port = 8080;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});