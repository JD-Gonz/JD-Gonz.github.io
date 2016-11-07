var express = require('express');

var server = express();
server.use('/public', express.static(__dirname + '/public'));

server.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var port = 8080;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});