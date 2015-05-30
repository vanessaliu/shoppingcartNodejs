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
	if(req.query.limit >= 0) {
    res.json(products.slice(0, req.query.limit));
  }else {
    // res.json(products); //write out the value
    res.json(Object.keys(products)); //write the key
    console.log(Object.keys(products));
  } 
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

    if(theNewProduct.id === replacedprod.id) {
        //Method 1
        // var index = products.indexOf(replacedprod);
        // products.splice(index, 1, theNewProduct);
        // 
        //Method 2
        // for( k in theNewProduct) {
        //    replacedprod[k] = theNewProduct[k];
        // }
        // Method 3
        var deletedprod = _.remove(products, function(n) {return n.id === theId;});
        products.push(theNewProduct);
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