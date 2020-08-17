import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Landing from "./landing/landing.component";
import About from "./about/about.component";
import Quiz from "./quiz/Quiz.component";

//Sign In / Sign UP Page...
import Authentication from "../../pages/authentication";
import Favorites from '../../pages/favorites'

// About Intro Component
// Intro is one of the main component along aside.
// While ASIDE behaves as a navbar INTRO switch componenets inside on demanad.

//The intro CSS Class control the size / border and fallback background of the container only.

//The Main Tittle, About, Blog are dynamic componenets, they will switch inside of the INTRO Component.
//Login Object
// {
//   login: {
//     currentUser: {
//       id: '',
//       createdAt: {
//         seconds: ,
//         nanoseconds:
//       },
//       displayName: 'Claudinei Bido',
//       email: 'claudinei.bido@gmail.com'
//     }
//   },


const Intro = () => {
  //1. Select only login from our state using destructuring
  //2. Select the currentUser, if the user is not logged in, it will be null otherwise it will be an object.

  const currentUser = useSelector(({ login }) => login.currentUser);

  return (
    <div className="intro">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/blog" component={About} />
        <Route exact path="/offers" component={About} />
        <Route
          exact
          path="/login"
          render={() => (currentUser ? <Redirect to="/" /> : <Authentication />)}
        />
        <Route
          exact
          path="/favorites"
          render={() => (currentUser ? <Favorites /> : <Authentication />)}
        />
      </Switch>
    </div>
  );
};

export default Intro;
