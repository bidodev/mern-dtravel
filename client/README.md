## About: 
This was a group project from **DCI's WEB Development Course**, which We attended between 2019 - 2021.

# Find the vacation of your dreams with Dtravel!

 A platform that helps you find a special vacation in line with your taste.
 Check the filters to sort our destinations according to your wish, whether it is a tropical, snowy, hiking, cycling trip, or just a city tour.
### Take our quiz for more personalized offers!

## Contact
Currently being developed by [Claudinei Bido](https://www.linkedin.com/in/bidoc/) - feel free to contact me!

## Original Team
- [Bido](https://www.linkedin.com/in/bidoc/)
- [Alex](https://github.com/hadabr)
- [Simona](https://github.com/SimonaHriscu)
- [Yaman](https://github.com/YamanKatmawi)

## 🚀 Technologies used
<img title="React 16" src="https://ih1.redbubble.net/image.32576156.9850/sticker,375x360.png" width="100" /><img title="Sass" src="https://vanseodesign.com/blog/wp-content/uploads/2015/09/sass-logo-2.png" width="100" /><img title="Redux 4" src="https://cdn-images-1.medium.com/max/800/1*tOI6UC5EaS2fPItCesI-AQ.png" width="100" />

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />

## Preview:
### Landing Page
![homepage](./doc/img/homepage.png)

### Modal Item View
![modalview](./doc/img/modalview.png)

### Login Page
![login](./doc/img/loginpage.png)

## RoadMap
## V5
- [ ] Admin Panel
- [ ] REST API with Express
- [ ] Database with MongoDB / Mongoose

## V4
- [x] APP UI refactored.
- [x] Redux Persist (Local Storage)
- [x] Favorites List

## V3
- [x] Authtentication using Firebase / Firestore
- [x] Redux Hooks (useSelector, useDispatch)
- [x] React Hooks (useState, useEffect)
- [X] APP UX refactored.

## V2
- [x] Filters / Adventurous Mood
- [x] All Offers / Quiz

## V1
- [x] UI / UX APP Structure
- [x] Redux / Search Engine

## Files Structure

```
Project
│   README.md
│   package.json
|   package-lock.json
|   .gitignore
|
└─── public
│      │
│      └─── index.html
|      └─── img
│            └─── img-background
|
|
└─── src
      └─── index.js
      └─── App.js
      │
      └─── components
      │        └─── aside
      |        |        └─── aside.component.jsx
      |        |        └─── adventurousmood
      |        |        └─── header
      |        |        └─── main
      |        |        └─── search
      |        └─── intro
      |        |        └─── intro.component.jsx
      |        |        └─── about
      |        |        └─── blog
      |        |        └─── landing
      |        |        └─── quiz
      |        └─── offers
      |                 └─── handleOfferSearch.js
      |                 └─── list-item.component.jsx
      |                 └─── OffersEndList.component.js
      │       
      |            
      │       
      |              
      |                
      └─── scss
      │        └─── main.scss
      │        └─── _app.scss
      |                 └─── _aside.scss
      |                 └─── _intro.scss
      |                 └─── _offers.scss
      |
      └─── redux
               └─── store
               |        └─── background-img.js
               |        └─── data.json
               |        └─── index.js
               └─── actions.js
               └─── data-reducer.js
               └─── imgs-bg-reducer.js
               └─── login-reducer.js
               └─── root-reducer.js
               └─── search-input.reducer.js
               
``` 
