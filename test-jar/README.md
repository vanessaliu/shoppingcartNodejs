# Hemuppgift - backend

Skapa ett REST-gränssnitt för att hantera en kundvagn (Shopping cart). API:et är baserat på två huvudresurser - _produkter_ och 
själva _kundvagnen_. Produkter kallas _products_ och kundvagnen kallas _shopping cart_ eller helt enkelt _cart_.


## Resurser
### Produkt
Bas-URI ska vara ```/products```

API:et ska stödja:
* listning av alla produkter (GET -> ```/products```)
* hämta produkt (GET -> ```/products/some-url-friendly-identifier```)
* skapa produkt (POST -> ```/products```)
* uppdatera produkt dvs namn, pris och momssats (PUT -> ```/products/some-url-friendly-identifier```)
* ta bort produkt (DELETE -> ```/products/some-url-friendly-identifier```)

JSON-strukturen för produkter ser ut så här:

```json
{
  "id":"some-url-friendly-identifier",
  "name":"Product name",
  "priceIncVat":10.0,
  "vatPercentage":0.25,
  "vatAmount":2.5
}
```

### Kundvagn
Bas-URI ska vara ```/carts```

API:et ska stödja:
* listning av alla kundvagnar (GET -> ```/carts```)
* hämta kundvagn (GET -> ```/carts/some-url-friendly-identifier```)
* skapa kundvagn (POST -> ```/carts```)
* uppdatera kundvagn dvs lägga till produktrader. Att lägga till en produktrad är detsamma som att lägga till en eller flera 
artiklar i kundvagnen. (PUT -> ```/carts/some-url-friendly-identifier```) 
* ta bort kundvagn (DELETE -> ```/carts/some-url-friendly-identifier```)

Nedanstående visar en kundvagn som är fylld med 3 stycken produktrader (```rows```). En produktrad består av produktinformation 
samt kvantitet/pris. Produkten vid namn _Bread_ har priset 10.0 
(```priceIncVat```) och en momssats på 25% (```vatPercentage```). I kundvagnen ligger det 2 stycken sådana vilket innebär att det totala 
priset för raden med _Bread_ blir 20.0 (```priceIncVatAmount```) och den totala momsen (```vatAmount```) för _Bread_ blir 5.0. 

Längst ned i hittar du totalbeloppen för alla artiklar i kundvagnen.

```json
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
}
```

En _PUT_ på URI:n ```/carts/<some-cart-id>``` förväntas lägga till en ny produktrad enligt följande struktur:
 ```json
 {
   "productId":"some-url-friendly-identifier",
   "quantity":1.0
 }
 ```

## Krav
* API:et ska vara [REST-baserat](http://sv.wikipedia.org/wiki/Representational_State_Transfer)
* Som transportformat ska [JSON](http://sv.wikipedia.org/wiki/JSON) användas
* Persistens kan göras på valfritt vis. Ingen installation får krävas ([H2](http://www.h2database.com/), [Neo4j](http://www.neo4j.org/), [MongoDB](http://www.mongodb.org/) eller varför inte en renodlad hashmap?)

### Java
* Om du bygger en javalösning ska [Apache Maven](http://maven.apache.org/) användas för att bygga och paketera API:et.
* API:et ska kunna startas direkt från Maven. Ett tips är att använda [Jetty](http://www.eclipse.org/jetty/) via Maven ```mvn jetty:run```.


### .NET
* Om du bygger en .Net-lösning skall en Visual Studio 2013-solution användas.
* API:et skall kunna startas direkt från Visual Studio.

### Node.js


# Testning
Testsviten som medföljer verifierar API:et och utgår från att ditt REST-gränssnitt exekverar på ```http://localhost:8080```. 
Obs att returkoder kontrolleras.
 
Nedanstående läsning rekommenderas:
* [Statuskoder](http://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete)
* [REST](http://redrata.com/restful-uri-design/)

För att köra testerna används följande javakommande (Java 8 krävs):
```
$ java -jar cygni-rekrytering-backend-shoppingcart-[version].jar
```

Om du vill köra mot en annan bas-URL än ```http://localhost:8080``` så kan du ändra detta genom att sätta flaggan 
```shoppingcart.base.uri``` vid uppstart. Exempel: 

```
$ java -Dshoppingcart.base.uri=http://host:port -jar cygni-rekrytering-backend-shoppingcart-[version].jar
```


# Övrigt
* Tänk på lager och [skiktning](http://www.programmera.net/architecture/layer.php).
* Exempel på möjliga ramverk: SpringMVC ([Spring Boot](http://projects.spring.io/spring-boot/)), [Dropwizard](https://dropwizard.github.io/dropwizard/), [Jersey](https://jersey.java.net/)
