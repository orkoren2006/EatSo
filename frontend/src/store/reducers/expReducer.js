const initialState = {
    exps: [
      {
        "_id": "e101",
        "name": "Amazing Kit-Chen",
        "type": "mediterranean",
        "title": "Israeli authentic meal and experience",
        "desc": "A casual, multi-course, gourmet Israeli- Mediterranean dinner prepared by a chef who trained in Michelin-starred restaurants in Italy and cooked in some of the best restaurants in Tel Aviv.",
        "price": 100,
        "capacity": {
          "min": 8,
          "max": 20
        },
        "schedule": {
          "at": 121545645612112310,
          "duration": 120 
        },
        "owner": {
          "_id": "u101",
          "fullName": "Chen kitty",
          "imgUrl": "/img/img1.jpg"
        },
        "tags": [
          "vegan",
          "vegge",
          "gluten free",
          "mediterranean"
        ],
        "imgUrls": [
          "main.jpg",
          "more1.jpg",
          "more2.jpg"
        ],
        "location": {
          "address": "Shabazi St 10, Tel Aviv-Yafo",
          "lat": 32.061149,
          "lng": 34.763583
        },
        "menu": {
          "appetizer": [
            {
              "title": "Jerusalem pretzel",
              "desc": "Jerusalem style pretzel with sesame and Za’atar"
            }
          ],
          "mainCourse": [
            {
              "title": "Kubenia",
              "desc": "hand chopped tenderloin with bulgur, smoked onion and almonds"
            }
          ],
          "desserts": [
            {
              "title": "Basbusa",
              "desc": "semolina cake with goat cheese cream, walnuts honey and cinnamon"
            }
          ],
          "drinks": [
            {
              "title": "Har Hermon",
              "desc": "merlot wine"
            }
          ]
        },
        "participants": [
          {
            "_id": "u104",
            "fullName": "Avi Nusbaum",
            "imgUrl": "/img/avi.jpg"
          }
        ],
        "reviews": [
          {
            "id": "madeId",
            "txt": "a great place to dine..",
            "rate": 4,
            "by": {
              "_id": "u103",
              "fullName": "Michal Ansky",
              "imgUrl": "/img/michal.jpg"
            }
          }
        ],
        "chatMsgs": [
          {
            "from": " {mini-user}",
            "txt": "What about...",
            "sentAt": 123456
          }
        ]
      },
      {
        "_id": "e102",
        "name": "Italian Nights",
        "type": "meal",
        "title": "Summer Nights Tasting Menu",
        "desc": "A culinary gem is hidden near the Basel complex. Join Tomer, a chef, in his chic apartment in the center of Tel Aviv for a meal with flavors that will take you one evening to an unforgettable visit to Sicily. What to expect:\n• A meticulous 8-course Sicilian chef's meal\n• Israeli and international wines are served throughout the meal without restriction\n• Chef with a rich background in restaurants in Israel and around the world\n• Designed apartment, near the Basel complex in Tel Aviv",
        "price": 150,
        "capacity": {
          "min": 12,
          "max": 20
        },
        "schedule": {
          "at": 121545645612112310,
          "duration": 150
        },
        "owner": {
          "_id": "u102",
          "fullName": "Haim Cohen",
          "imgUrl": "/img/haim.jpg"
        },
        "tags": [
          "Italian",
          "Meat",
          "Star Chef"
        ],
        "imgUrls": [
          "main.jpg",
          "more1.jpg",
          "more2.jpg"
        ],
        "location": {
          "address": "Kikar Kdumim 10, Tel Aviv-Yafo",
          "lat": 32.054514,
          "lng": 34.751456
        },
        "menu": {
          "appetizer": [
            {
              "title": "Home-made breads",
              "desc": "Home-made breads from a traditional brick oven"
            },
            {
              "title": "Bobs beans, with tomatoes, basil, shallots and garlic confit",
              "desc": "Lima beans, garlic confit, shallots, semi dried tomatoes, basil and tahini sauce"
            },
            {
              "title": "Young beets in the oven, hazelnut oil, \"yogurt stone\" and arugula",
              "desc": "Smoked eggplant, thyme cream, and sheep yogurt"
            }
          ],
          "mainCourse": [
            {
              "title": "Grilled young kohlrabi, cachuta cheese, sunflower and thyme vinaigrette",
              "desc": "Chopped beef tenderloin, spices from Palermo, Turkish spinach, barley and walnuts"
            },
            {
              "title": "Long-cooked beef shoulder, spinach risotto, beef axis and spicy crust",
              "desc": "Slow roasted beef chuck, risotto with butter and white wine served with \"green\" sauce"
            }
          ],
          "desserts": [
            {
              "title": "Goat cheese cream, Sicilian cookie and golden pear",
              "desc": "Goat cheese cream, Chebakia cookie, honey, fresh pears and cinnamon"
            }
          ],
          "drinks": [
            {
              "title": "Drinks & Beverages",
              "desc": "Red Wine, White Wine, Wine"
            }
          ]
        },
        "participants": [
          {
            "_id": "u102",
            "fullName": "user2",
            "imgUrl": "/img/img2.jpg"
          }
        ],
        "reviews": [
          {
            "id": "madeId",
            "txt": "a great place to dine..",
            "rate": 4,
            "by": {
              "_id": "u102",
              "fullName": "user2",
              "imgUrl": "/img/img2.jpg"
            }
          }
        ],
        "chatMsgs": [
          {
            "from": " {mini-user}",
            "txt": "What about...",
            "sentAt": 123456
          }
        ]
      },
      {
        "_id": "e103",
        "name": "Come Eat Lionesses",
        "type": "meal",
        "title": "Innovative Sustainable Tasting Menu in Hackney",
        "desc": "Michelin-trained Chef Aidan Brooks, creator of Eleven98 invites you to experience his Chef's Table concept: an innovative and sustainable fine dining tasting menu in the open-plan dining space of his Shoreditch home.\nWhat to expect :  \n• An innovative, sustainable 7-course tasting menu\n• Welcome drink on arrival\n• Guests are welcome to BYOB\n• In the heart of Hackney, East London's most sought-after borough\n• 10 guests around one communal table\n• Host offers both private and open events\n• Former Head Chef at the critically acclaimed Vanilla Black",
        "price": 200,
        "capacity": {
          "min": 2,
          "max": 10
        },
        "schedule": {
          "at": 121545645612112310,
          "duration": 120
        },
        "owner": {
          "_id": "u106",
          "fullName": "Lucy Bronze",
          "imgUrl": "/img/Lucy.jpg"
        },
        "tags": [
          "Tasting",
          "sustainable",
          "Dinner",
          "vegan"
        ],
        "imgUrls": [
          "main.jpg",
          "more1.jpg",
          "more2.jpg"
        ],
        "location": {
          "address": "10 Downing St, Westminster, London SW1A 2AA, United Kingdom",
          "lat": 51.503348,
          "lng": -0.127624
        },
        "menu": {
          "appetizer": [
            {
              "title": "PULLED PARTRIDGE CROQUETTE",
              "desc": "Hawthorn Ketchup - The secret course"
            },
            {
              "title": "CUCUMBER IN MANY GUISES",
              "desc": "Labneh + Pumpernickel"
            }
          ],
          "mainCourse": [
            {
              "title": "ROASTED PORRIDGE",
              "desc": "Ajoblanco + Fermented Green Beans"
            },
            {
              "title": "STOKE NEWINGTON RHUBARB",
              "desc": "Buttermilk, Almond + Tonka Bean"
            }
          ],
          "desserts": [
            {
              "title": "CHOCOLATE OR VEGAN TRUFFLES",
              "desc": "Dark Chocolate Ganache, Porcini + White Truffle Oil"
            }
          ],
          "drinks": [
            {
              "title": "Drinks & Beverages",
              "desc": "Cocktail, Guests can bring alcohol"
            }
          ]
        },
        "participants": [
          {
            "_id": "u107",
            "fullName": "Alaska Thunderfuck",
            "imgUrl": "/img/alaska.jpg"
          },
          {
            "_id": "u105",
            "fullName": "Magen Rapinoe",
            "imgUrl": "/img/magen.jpg"
          }
        ],
        "reviews": [
          {
            "id": "madeId",
            "txt": "a great place to dine..",
            "rate": 4,
            "by": {
              "_id": "u102",
              "fullName": "user2",
              "imgUrl": "/img/img2.jpg"
            }
          }
        ],
        "chatMsgs": [
          {
            "from": " {mini-user}",
            "txt": "What about...",
            "sentAt": 123456
          }
        ]
      },
      {
        "_id": "e104",
        "name": "Come BBQ in the oval office",
        "type": "meal",
        "title": "presidential meal",
        "desc": "Calling all meat lovers! Experience a delightful authentic Uruguayan barbecue in the heart of Brooklyn made with organic, market-fresh ingredients sourced locally and imported Uruguayan beef.\n• Classic Uruguayan barbecue slowly cooked over firewood embers\n• Yerba mate crafted cocktails, guests can also BYOB\n• Communal dining for 4 to 20 people\n• Casual atmosphere: 'mi casa es tu casa' - make yourself at home!",
        "price": 250,
        "capacity": {
          "min": 20,
          "max": 40
        },
        "schedule": {
          "at": 121545645612112310,
          "duration": 120
        },
        "owner": {
          "_id": "u108",
          "fullName": "Barak Obama",
          "imgUrl": "/img/barak.jpg"
        },
        "tags": [
          "BBQ",
          "Traditional",
          "Special location",
          "meat"
        ],
        "imgUrls": [
          "main.jpg",
          "more1.jpg",
          "more2.jpg"
        ],
        "location": {
          "address": "1600 Pennsylvania Avenue NW, Washington, DC 20500, United States",
          "lat": 38.897466, 
          "lng": -77.036580
        },
        "menu": {
          "appetizer": [
            {
              "title": "Welcome Yerba Mate Cocktail",
              "desc": "yerba mate is a typical South American tea infused with vodka and fresh herbs"
            },
            {
              "title": "Grill Chorizo Bruschetta",
              "desc": "homemade Argentian sausage and blood sausage made locally in Queens served with homemade sourdough bread"
            },
            {
              "title": "Homemade Baked Humita Empanada",
              "desc": "corn-cheese baked empanada"
            }
          ],
          "mainCourse": [
            {
              "title": "Grilled Organic Seasonal Vegetables",
              "desc": "potatoes, onions, and carrots"
            },
            {
              "title": "Parrillada",
              "desc": "grill organic uruguayan ribeye + skirt steak served with chimichurri sauce"
            }
          ],
          "desserts": [
            {
              "title": "Smoked Pineapple & Masscarpone",
              "desc": "Pineapple on the grill & Masscarpone cheese"
            }
          ],
          "drinks": [
            {
              "title": "Drinks & Beverages",
              "desc": "Cocktail, Guests can bring alcohol, Tea, Water, Yerba"
            }
          ]
        },
        "participants": [
          {
            "_id": "u107",
            "fullName": "Alaska Thunderfuck",
            "imgUrl": "/img/alaska.jpg"
          },
          {
            "_id": "u105",
            "fullName": "Magen Rapinoe",
            "imgUrl": "/img/magen.jpg"
          }
        ],
        "reviews": [
          {
            "id": "madeId",
            "txt": "a great place to dine..",
            "rate": 4,
            "by": {
              "_id": "u102",
              "fullName": "user2",
              "imgUrl": "/img/img2.jpg"
            }
          }
        ],
        "chatMsgs": [
          {
            "from": " {mini-user}",
            "txt": "What about...",
            "sentAt": 123456
          }
        ]
      }
    ],
  };
  
  export function expReducer (state = initialState, action = {}) {
    switch (action.type) {
      case 'SET_EXPS':
        return { ...state, exps: action.exps };
      case 'ADD_EXP':
        return { ...state, exps: [...state.exps, action.exps] };
      case 'UPDATE_EXP':
        return {
          ...state,
          exps: state.exps.map(exp =>
            exp._id === action.exp._id ? action.exp : exp
          )};
      default:
        return state;
    }
  }
  