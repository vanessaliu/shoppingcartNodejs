var Carts = function(app) {
  //******************   PRODUCTS    *********************//
  var carts = [
    {
      "id":"2712e86a-d519-48af-b50b-194e9a2102de",
      "rows":[
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
      ],
      "totalPriceIncVatAmount":24.0,
      "totalVatAmount":5.5
    },
    {
      "id":"2712e86a-d519-48af-b50b-194e9a2102deOne",
      "rows":[
        {
          "id":"43ec13fa-af95-4d1e-974c-d439b9946eea",
          "name":"Milk1",
          "priceIncVat":1.0,
          "vatPercentage":0,
          "vatAmount":0,
          "quantity":2,
          "priceIncVatAmount":2
        },
        {
          "id":"37deb3ff-0198-421e-8f87-a1f4f08ab033",
          "name":"Bread1",
          "priceIncVat":10.0,
          "vatPercentage":0.25,
          "vatAmount":5,
          "quantity":2,
          "priceIncVatAmount":20.0
        },
        {
          "id":"933ea947-57da-4330-8ceb-795265e5d0f3",
          "name":"Juice1",
          "priceIncVat":1,
          "vatPercentage":0.25,
          "vatAmount":0.5,
          "quantity":2.0,
          "priceIncVatAmount":2.0
        }
      ],
      "totalPriceIncVatAmount":24.0,
      "totalVatAmount":5.5
    }
  ];

  // listning av alla kundvagnar (GET -> /carts)
  app.get('/carts', function (req, res) {
      if(req.query.limit >= 0) {
        res.json(carts.slice(0, req.query.limit));
      }else {
        // res.json(carts); //write out the value
        res.json(Object.keys(carts)); //write the key
        console.log(Object.keys(carts));
      } 
      console.log(carts);
      res.end();
  });

  // hämta kundvagn (GET -> /carts/some-url-friendly-identifier)
  app.get('/carts/:id', function(req, res) {
      var theId = req.params.id;
      var id = carts[theId].id;
      var rows = carts[theId].rows;
      var totalPriceIncVatAmount = carts[theId].totalPriceIncVatAmount;
      var totalVatAmount = carts[theId].totalVatAmount;
      var cart = [];
      cart.push({
        "id":id,
        "rows":rows,
        "totalPriceIncVatAmount":totalPriceIncVatAmount,
        "totalVatAmount":totalVatAmount
      });
      if (cart) {
          res.json(cart);
      } else {
          res.status(404);
      }
  });

  // skapa kundvagn (POST -> /carts)
  app.post('/carts', function (req, res) {
    var cart = req.body;
    if (_.isArray(cart)) {
      for (var i = 0; i < cart.length; i++) {
        carts.push(cart[i]);
        res.status(201).json(carts);
      };
    }else {
      carts.push(cart);
      res.status(201).json(carts);
    }
    console.log("Saving cart: " + cart.id);
    res.end();
  });

  //ta bort kundvagn (DELETE -> /carts/some-url-friendly-identifier)
  app.delete('/carts/:id', function(req, res) {
      var theId = req.params.id;
      if (!carts[theId]) {
        response.sendStatus(404);
      }else{
        delete carts[theId];
        res.sendStatus(200);
      }
     console.log(carts);
  });

  //uppdatera kundvagn dvs lägga till produktrader.
  app.put('/carts/:id', function(req, res) {
      var theId = req.params.id;
      var theNewProduct = req.body;
      console.log(theNewProduct);
      if(theId < carts.length){
        var theProductsInTheCart = carts[theId].rows;
        theProductsInTheCart.push(theNewProduct);
      } 
      else{
          console.log(404);
          // res.status(404).send({"message":"Can not find the cart"});
      }
      console.log(carts);
      res.end();
  });

} 
module.exports.initCarts = Carts;
