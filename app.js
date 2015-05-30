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


//******************   PRODUCTS    *********************//
var products = [
    {
      "id":"43ec13fa-af95-4d1e-974c-d439b9946eea",
      "name":"Milk",
      "priceIncVat":1.0,
      "vatPercentage":0,
      "vatAmount":0,
      "quantity":2,
      "priceIncVatAmount":2
    },
    {
      "id":"37deb3ff-0198-421e-8f87-a1f4f08ab033",
      "name":"Bread",
      "priceIncVat":10.0,
      "vatPercentage":0.25,
      "vatAmount":5,
      "quantity":2,
      "priceIncVatAmount":20.0
    },
    {
      "id":"933ea947-57da-4330-8ceb-795265e5d0f3",
      "name":"Juice",
      "priceIncVat":1,
      "vatPercentage":0.25,
      "vatAmount":0.5,
      "quantity":2.0,
      "priceIncVatAmount":2.0
    }
];

//listning av alla produkter
app.get('/products', function(req, res) {
  console.log(products);
	if(req.query.limit >= 0) {
    res.json(products.slice(0, req.query.limit));
  }else {
    // res.json(products); //write out the value
    res.json(Object.keys(products)); //write the key
    console.log(Object.keys(products));
  } 
});

//hämta en produkt 
app.get('/products/:id', function(req, res) {
    var theId = req.params.id;
    var id = products[theId].id;
    var name = products[theId].name;
    var priceIncVat = products[theId].priceIncVat;
    var vatPercentage = products[theId].vatPercentage;
    var vatAmount = products[theId].vatAmount;
    var quantity = products[theId].quantity;
    var priceIncVatAmount = products[theId].priceIncVatAmount;
    var prod = [];
    prod.push({
      "id":id,
      "name":name,
      "priceIncVat":priceIncVat,
      "vatPercentage":vatPercentage,
      "vatAmount":vatAmount,
      "quantity":quantity,
      "priceIncVatAmount":priceIncVatAmount
    });
    if (prod) {
        res.json(prod);
    } else {
        res.status(404);
    }
});

//skapa produkt(s)
app.post('/products', function (req, res) {
  var product = req.body;
  if (_.isArray(product)) {
  	for (var i = 0; i < product.length; i++) {
  		products.push(product[i]);
      res.status(201).json(products);
  	};
  }else {
    products.push(product);
    res.status(201).json(products);
  }
  console.log("Saving product: " + product.name);
  res.end();
});

//ta bort produkt
app.delete('/products/:id', function(req, res) {
    var theId = req.params.id;
    if (!products[theId]) {
      response.sendStatus(404);
    }else{
      delete products[theId];
      res.sendStatus(200);
    }
   console.log(products);
});

//uppdatera produkt
app.put('/products/:id', function(req, res) {
    var theId = req.params.id;
    var theNewProduct = req.body;
    console.log(req.query);
    if(theId < products.length){
      if(theNewProduct.id === products[theId].id) {
          products.splice(theId, 1, theNewProduct);
          
      }else{
        console.log(404);
          // res.status(404).send({"message":"Can not find the product"});
      }
    }
    else{
        console.log(404);
        // res.status(404).send({"message":"Can not find the product"});
    }
    console.log(products);
    res.end();
});

app.get('/carts', function (req, res) {
    // res.json([]);
    console.log(carts);
    res.end();
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});