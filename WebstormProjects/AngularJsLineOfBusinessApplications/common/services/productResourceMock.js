/**
 * Created by tobysinclair on 03/06/2015.
 */
(function () {
    "use strict";

    var app = angular
        .module("productResourceMock",
        ["ngMockE2E"]);

    app.run(function ($httpBackend){

        var products = [
            {
                "productId": 1,
                "productName": "Northface Gilet",
                "productCode": "GDN-0011",
                "releaseDate": "March 19, 2009",
                "description": "A lovely Gilet that is very popular amongst the testing community",
                "cost": 9.00,
                "price": 19.95,
                "category": "Testing Gilets",
                "tags": ["Wet", "Windy", "Danny", "Dainton"],
                "imageUrl": "http://www.ukshopsonline.net/images/DB/TheNorthFaceClothingForMen.jpg"
            },
            {
                "productId": 2,
                "productName": "Woolen Gilet",
                "productCode": "GDN-0023",
                "releaseDate": "March 18, 2010",
                "description": "A typical estonian wooly Gilet",
                "cost": 60.00,
                "price": 32.99,
                "category": "Traditional Gilets",
                "tags": ["wool", "sheep", "estonian"],
                "imageUrl": "http://i00.i.aliimg.com/wsphoto/v0/32309621846_1/Real-Womens-Knitted-Rabbit-Fur-Vest-Fashion-Wollen-Street-Style-font-b-Gilet-b-font-With.jpg"
            },
            {
                "productId": 5,
                "productName": "Addidas Gilet",
                "productCode": "TBX-0048",
                "releaseDate": "May 21, 2013",
                "description": "A very sporty Gilet that can be used for sporting activties.",
                "cost": 1.00,
                "price": 8.99,
                "category": "Sporting Gilet",
                "tags": ["sport", "sweat"],
                "imageUrl": "http://images.scotbycycles.co.uk/images/products/zoom/1365259530-56744300.jpg"
            },
            {
                "productId": 8,
                "productName": "Leather Gilet",
                "productCode": "TBX-0022",
                "releaseDate": "May 15, 2009",
                "description": "A Gilet for the Heavy metal fans out there. Can be personalised with studding",
                "cost": 6.95,
                "price": 11.55,
                "category": "Heavy Metal Gilet",
                "tags": ["Metallica", "Death metal"],
                "imageUrl": "http://i01.i.aliimg.com/wsphoto/v0/2045297865_1/Winter-font-b-Men-s-b-font-Warm-Windproof-font-b-Leather-b-font-Fleece-Motorcycle.jpg"
            },
            {
                "productId": 10,
                "productName": "Rubber Gilet",
                "productCode": "GMG-0042",
                "releaseDate": "October 15, 2002",
                "description": "Ever wanted a wipe clean Gilet, well here it is",
                "cost": 2.22,
                "price": 35.95,
                "category": "Wipe Clean Gilets",
                "tags": ["Dirty", "Dirty", "Dirty"],
                "imageUrl": "http://cdn.coresites.factorymedia.com/rcuk/wp-content/uploads/2013/05/IMG_1287-620x413.jpg"
            }
        ];

        var productUrl = "/api/products";

        $httpBackend.whenGET(productUrl).respond(products);

        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');

        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var product = {"productId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                };
            }
            return [200, product, {}];
        });

        $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
            var product = angular.fromJson(data);

            if (!product.productId) {
                // new product Id
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                // Updated product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                };
            }
            return [200, product, {}];
        });

        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();
    });
}());