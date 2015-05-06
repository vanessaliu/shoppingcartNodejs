var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var products = [];

//listning av alla produkter
app.get('/products', function(req, res) {
	console.log(products);
	res.end();
});

//hämta produkt 
app.get('/products/:id', function(req, res) {
   var theId = req.params.id;
   var prod = _.find(products, function(p) {
     return p.id === theId;
   });
   if (prod) {
      res.json(prod);
      console.log("The product is",prod);
   } else {
      res.status(404);
   }
   console.log("You requested a product with id " + theId);
});

//skapa produkt(s)
app.post('/products', function (req, res) {
  var product = req.body;
  if (_.isArray(product)) {
  	for (var i = 0; i < product.length; i++) {
  		products.push(product[i]);
  	};
  }else {
  	products.push(product);
  }
  console.log("Saving product: " + product.name);
  res.end();
});

//ta bort produkt
app.delete('/products/:id', function(req, res) {
   var theId = req.params.id;
   var deletedprod = _.remove(products, function(n) {
	  return n.id === theId;
	});
   if (deletedprod) {
      res.json(deletedprod);
      console.log("deleted", deletedprod.name);
   } else {
      res.status(404);
   }
   console.log(products);
});

//uppdatera produkt
app.put('/products/:id', function(req, res) {
   var theId = req.params.id;
   var theNewProduct = req.body;
   console.log(req.query);
   
   var replacedprod = _.find(products, function(n) {
	  return n.id === theId;
	});

   for( k in theNewProduct) {
      replacedprod[k] = theNewProduct[k];
   }
   // var index = products.indexOf(replacedprod);

   // products.splice(index, 1,theNewProduct);
   console.log(products);
   res.end();
});




app.get('/carts', function (req, res) {
  res.json([]);
});

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});