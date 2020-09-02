# [Dtravel](http://dtravel.bido.dev)


# Find the vacation of your dreams with Dtravel!

 A platform that helps you find a special vacation in line with your taste.
 Check the filters to sort our destinations according to your wish, whether it is a tropical, snowy, hiking, cycling trip, or just a city tour. Created with the MERN stack and Redux.

## General Info

This project is not intended for production. 
The reason I built it was to practice building web applications from scratch and get familiarized with the use of Redux and Firebase.

## Technologies

<img title="React 16" src="https://ih1.redbubble.net/image.32576156.9850/sticker,375x360.png" width="100" /> <img title="Sass" src="https://vanseodesign.com/blog/wp-content/uploads/2015/09/sass-logo-2.png" width="100" />
<img title="Redux 4" src="https://cdn-images-1.medium.com/max/800/1*tOI6UC5EaS2fPItCesI-AQ.png" width="100" />
<img title="Express 4" src="https://uploads.toptal.io/blog/category/logo/25/express_js.png" width="100" />
<img title="JasonWebToken" src="https://werkraum.net/fileadmin/news_import/jwt_pic_logo.svg.png" width="100" />
<img title="MongoDB" src="https://www.clouda.ca/wp-content/uploads/2013/03/mongodb-logo.png" width="100" />
<img title="Node.js 12" src="https://ih1.redbubble.net/image.109336634.1604/flat,550x550,075,f.u1.jpg" width="100" />

## Features
- 
-


To Do:
-
-

## Design


# Dtravel REST API

## About:

This REST API was built during **DCI's WEB Development Course**, which We attended between 2019 - 2021.

This API is beeing used for the [Dtravel Client](https://github.com/bidodev/react-dtravel-client)

## Endpoints

### /api/v1/places

| Method | Desc                   | Endpoint          |
| ------ | ---------------------- | ----------------- |
| GET    | Get all the places     | /api/v1/places    |
| GET    | Get an unique place    | /api/v1/places/id |
| PATCH  | Update an unique place | /api/v1/places/id |
| DELETE | Delete an unique place | /api/v1/places/id |
| POST   | Create an unique place | /api/v1/places    |

### Creating an new Place using Postman

**localhost:8000/api/v1/places**

_JSON Body_

```javascript
{
    "productName": "phuket",
    "description": "Located in southern Thailand, Phuket offers something for everyone, especially budget-minded travelers. Everything from accommodations to spa treatments to boat tours come with a low price tag. For stunning scenery, check out the limestone cliffs of Phang Nga Bay and lounge on Phuket's gorgeous white sand beaches. Other must-sees include Wat Chalong Temple and the Big Buddha. Once the sun sets, take part in the island's lively nightlife scene.",
    "country": "thailand",
    "continent": "asia",
    "type": "tropical",
    "difficulty": "medium",
    "price": 3000,
    "cover": {
      "url": "phuket/mike-swigunski.jpg",
      "description": "Maui is an island in the Central Pacific, part of the Hawaiian archipelago."
    },
    "imgs": [
      {
        "url": "phuket/william-rouseh.jpg",
        "description": "phuket Image 1 - Put some description"
      },
      {
        "url": "phuket/frankie-spontell.jpg",
        "description": "phuket Image 2 - Put some description"
      },
      {
        "url": "phuket/vitaly-sacred.jpg",
        "description": "Maui Image 3 - Put some description"
      }
    ]
  }
```

### /api/v1/users

| Method | Desc              | Endpoint             |
| ------ | ----------------- | -------------------- |
| POST   | Signup with a User | /api/v1/users/signup |

### Creating a new user using Postman

**localhost:8000/api/v1/users/signup**

_JSON Body_

```javascript
    {
    "name": "Claudinei Bido",
    "email": "claudinei.bido@gmail.com",
    "password": "mypassword",
    "passwordConfirm": "mypassword"
}
```

## Filters

### Pagination

**/api/v1/places?page=1&limit=5**

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install all the required packages.

### `yarn start:dev`

Runs the app in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

### `yarn start:production`

Start the API in production mode, all the loggers will be disabled<br />

### `yarn debug`

Start the API in debugger mode using [ndb](https://github.com/GoogleChromeLabs/ndb) debugger <br />

## 🚀 Technologies used

<img title="Express 4" src="https://uploads.toptal.io/blog/category/logo/25/express_js.png" width="72" /> <img title="JasonWebToken" src="https://werkraum.net/fileadmin/news_import/jwt_pic_logo.svg.png" width="72" /> <img title="MongoDB" src="https://www.clouda.ca/wp-content/uploads/2013/03/mongodb-logo.png" width="72" /> <img title="Node.js 12" src="https://ih1.redbubble.net/image.109336634.1604/flat,550x550,075,f.u1.jpg" width="72" />

## Contact

Created by [Claudinei Bido](https://www.linkedin.com/in/bidoc/) - feel free to contact me!
