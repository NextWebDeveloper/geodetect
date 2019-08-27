var express = require('express');
var app = express();

app.get('/', function (req, res) {
	var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
	req.connection.remoteAddress || 
	req.socket.remoteAddress || 
	req.connection.socket.remoteAddress
  return res.send(ip + '___' + req.connection.remoteAddress);
});

const port = process.env.PORT || 1000

app.listen(port, function () {

});