var _ = require('lodash');
var bodyParser = require('body-parser');
// var parseUrlencoded = bodyParser.urlencoded({extended: false});
var express = require('express'); // get a function back
var app = express(); // call the function

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var Prodcuts = require("./products");
Prodcuts.initProducts(app);

var Carts = require("./carts");
Carts.initCarts(app);

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});