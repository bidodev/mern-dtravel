import React from "react";
import ReactDOM from "react-dom";

//import fontawesome
import "./lib/icons";

//redux imports
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

//react router dom
import { BrowserRouter as Router } from "react-router-dom";

//import react carousel css
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import App from "./App";

// Load Nunito Sans typeface
// reference: https://github.com/KyleAMathews/typefaces/tree/master/packages/nunito-sans
require('typeface-nunito-sans');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);
