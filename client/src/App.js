import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './app.scss';

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
const Favorites = lazy(() => import('./pages/favorites/favorites'));
const Offers = lazy(() => import('./pages/offers/offers'));
const Quiz = lazy(() => import('./pages/quiz/quiz'));
const Main = lazy(() => import('./pages/main/main'));
const Authentication = lazy(() =>
  import('./pages/authentication/authentication')
);

const App = () => {
  const themeValue = useSelector(({ userConfig }) => userConfig.darkMode);
  /**Aplication Status
   * default isLoading: true
   */
  const [isLoading, setLoadingState] = useState(true);

  //Use dispatch, similar to connect when not using Hooks
  const dispatch = useDispatch();

  //2. Similar to componentDidMount when using class components.
  useEffect(() => {
    /**
     * define the userPreviousConfigurations
     */
    const className = 'dark-mode';
    const classList = document.body.classList;

    themeValue ? classList.add(className) : classList.remove(className);

    /**
     * Update our redux state with our backgrounds
     * */

    axios
      .get('/api/v1/data/backgrounds')
      .then((res) => {
        const { data } = res.data;
        dispatch({ type: 'SET_BACKGROUNDS', payload: data.backgrounds });
      })
      .catch((err) => console.log(err.message));

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
  }, [dispatch, themeValue]);

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
            <Suspense fallback={<Spinner />}>
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
                render={() =>
                  currentUser ? <Favorites /> : <Authentication />
                }
              />
            </Suspense>
          </Switch>
          <Aside />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
