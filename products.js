var _ = require('lodash');
var Prodcuts = function(app) {
  //******************   PRODUCTS    *********************//
  var products = [];
  /*
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
  */

  //listning av alla produkter
  app.get('/products', function(req, res) {
    console.log("Products: " + products);
    if(req.query.limit >= 0) {
      res.json(products.slice(0, req.query.limit));
    }else {
       res.json(products); //write out the value
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

  //skapa produkt(er)
  app.post('/products', function (req, res) {
    var product = req.body;
    if (_.isArray(product)) {
      for (var i = 0; i < product.length; i++) {
        products.push(product[i]);
        res.status(201).json(products);
      };
    }else {
      products.push(product);
      res.status(201).location("http://localhost:8080/products/" + product.id).json(products);
    }
    console.log("Saving product: " + product.name);
    res.end();
  });


  //ta bort en produkt
  app.delete('/products/:id', function(req, res) {
      var theId = req.params.id;
      console.log("DELETING: " + theId);
      for (var i = 0; i < products.length; i++) {
          if (products[i].id === theId) {
            console.log("the products id equals");
            products.splice(i,1);
            res.sendStatus(200);
          }
      };

     console.log(products);
  });

  //uppdatera produkten
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

  app.on("error", function(error){
    console.error(error.message);
  });

}
module.exports.initProducts = Prodcuts;
