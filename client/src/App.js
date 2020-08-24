import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import "./app.scss";

/**
 * Firebase
 * auth and createUserProfileDocument methods 
 * */
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';

/**
 * Axios 
 * */
import axios from 'axios';

/**
 * Spinner 
 * */
import Spinner from './components/spinner/spinner.component';

/**
 * Aside Bar
 * */
import Aside from './components/aside/aside.component';

/** Pages */
import Main from './pages/main/main';
import Authentication from './pages/authentication/authentication';
import Favorites from './pages/favorites/favorites';
import Offers from './pages/offers/offers';
import Quiz from './pages/quiz/quiz';

const App = () => {
  /**Aplication Status
   * default isLoading: true
   */
  const [isLoading, setLoadingState] = useState(true);

  //Use dispatch, similar to connect when not using Hooks
  const dispatch = useDispatch();

  //2. Similar to componentDidMount when using class components.
  useEffect(() => {
    axios('http://localhost:8000/api/v1/data/backgrounds').then((res) => {
      const { data } = res.data;
      dispatch({ type: 'SET_BACKGROUNDS', payload: data.backgrounds });
    });

    setTimeout(() => {
      setLoadingState(false);
    }, 2000);

    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          //Update our redux store with the newUser Object.
          dispatch({
            type: 'LOGIN_USER',
            payload: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        dispatch({
          type: 'LOGIN_USER',
          payload: userAuth, //it will be null
        });
      }
    });

    //componetWillUnmount
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const currentUser = useSelector(({ login }) => login.currentUser);

  /* If the Aplication sttatus isLoading, render the Spinner,
   * otherwise render the routes and the aside (navigation bar component)
   */
  return (
    <div className="app">
      {isLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/quiz" component={Quiz} />
            <Route
              exact
              path={['/places', '/experiences', '/housings']}
              component={Offers}
            />
            <Route
              exact
              path="/login"
              render={() =>
                currentUser ? <Redirect to="/" /> : <Authentication />
              }
            />
            <Route
              exact
              path="/favorites"
              render={() => (currentUser ? <Favorites /> : <Authentication />)}
            />
          </Switch>
          <Aside />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
