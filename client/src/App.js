import React, { useEffect, useState } from "react";
import { Link, useHistory, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Spinner from "./components/spinner/spinner.component";
import ExperienceItem from "./components/aside/discover/experiences/experience.item.component";
import ShowModal from "./components/intro/modal/offer.component";
import axios from "axios";

import Main from "./pages/home/main";
import Authentication from "./pages/authentication/authentication";
import Favorites from './pages/favorites/favorites'

import Offers from './components/offers/offers.component'
import Quiz from "./components/quiz/Quiz.component";

//import userDispatch to dispatch actions to our react-reduces
import { useDispatch } from "react-redux";

//import authtentication from firebase
import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";

const App = () => {
  //spinner status
  const [isLoading, setLoadingState] = useState(true);
  const iconStatus = useSelector(({ filters }) => filters.mood);

  //Use dispatch, similar to connect when not using Hooks
  const dispatch = useDispatch();

  // function to update our redux state
  const updateFilters = (event) => {
    const valueMood = event.target.id;

    //Update Search input to simulate a search with specific keywords..
    dispatch({ type: "UPDATE_MOOD", payload: valueMood });
  };

  //2. Similar to componentDidMount when using class components.
  useEffect(() => {
    axios("http://localhost:8000/api/v1/data/backgrounds").then((res) => {
      const { data } = res.data;
      dispatch({ type: "SET_BACKGROUNDS", payload: data.backgrounds });
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
            type: "LOGIN_USER",
            payload: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        dispatch({
          type: "LOGIN_USER",
          payload: userAuth, //it will be null
        });
      }
    });

    //componetWillUnmount
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const Aside = () => {
    return (
      <div className="app__aside">
        <Header />
        <Filters />
        <Carousel />
        <Code />
        <Footer />
      </div>
    );
  };

  const Header = () => {
    //load the currentUser propertie from the redux store.
    const currentUser = useSelector(({ login }) => login.currentUser);
    return (
      <div className="app__aside__header">
        <nav className="app__aside__header__nav">
          <div className="app__aside__header__nav-icon">
            <img src="./img/dt.svg" alt="" />
          </div>
          <ul>
            <div className="app__aside__header__nav-search">
              <ion-icon name="search-outline"></ion-icon>
            </div>

            <Link to="/">Home</Link>

            {currentUser ? <Link to="/favorites">Favorites</Link> : null}
            {currentUser ? (
              <div className="option-logged" onClick={() => auth.signOut()}>
                SIGN OUT
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </ul>
        </nav>
      </div>
    );
  };
  const Filters = () => {
    return (
      <div className="app__aside__filters">
        <h2>Discover</h2>
        <nav onClick={({ target }) => updateItem(target.value)}>
          <button value="places">Places</button>
          <button value="experiences">Experiences</button>
          <button value="housings">Housings</button>
        </nav>
        <div className="app__aside__filters__mood">
          <ul onClick={updateFilters}>
            <li>
              {iconStatus === "tropical" ? (
                <ion-icon id="tropical" name="sunny"></ion-icon>
              ) : (
                <ion-icon id="tropical" name="sunny-outline"></ion-icon>
              )}
            </li>
            <li>
              {iconStatus === "winter" ? (
                <ion-icon id="winter" name="snow"></ion-icon>
              ) : (
                <ion-icon id="winter" name="snow-outline"></ion-icon>
              )}
            </li>
            <li>
              {iconStatus === "mountain" ? (
                <ion-icon id="mountain" name="map"></ion-icon>
              ) : (
                <ion-icon id="mountain" name="map-outline"></ion-icon>
              )}
            </li>
            <li>
              {iconStatus === "cycling" ? (
                <ion-icon id="cycling" name="bicycle"></ion-icon>
              ) : (
                <ion-icon id="cycling" name="bicycle-outline"></ion-icon>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  /** Carousel */

  const [item, updateItem] = useState("places");
  const [results, setResults] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [spinnerLoading, setSpinnerLoading] = useState();

  useEffect(() => {
    setSpinnerLoading(true);
    axios(`http://localhost:8000/api/v1/data/${item}?page=1&limit=2`).then(
      (res) => {
        const { data } = res.data;
        setResults(data.results);
        setTimeout(() => {
          setSpinnerLoading(false);
        }, 1000);
      }
    );
  }, [item, iconStatus]);

  /**
   * 1. This function set the status of the Modal to Open.
   * 2. It updates the local state with the Data to render the modal.
   * 3. It checks if the item is on the Favorites and pass (false or true)
   */
  const openModal = (props) => {
    /**
     * update localState with modal state/data
     */
    setIsOpen(true);
    setDataModal(props);
  };

  /**
   * This function update the local state and close the modal.
   */
  const closeModal = () => {
    setIsOpen(false);
  };

  const ShowOffers = () => {
    let history = useHistory();

    function handleClick() {
      history.push(item);
    }

    return (
      <button type="button" onClick={handleClick}>
        Show all {`${item}`}
      </button>
    );
  };

  const SearchResults = () => {
    return (
      <div className="search-results">
        <h3>
          Searching for {iconStatus} {item}...
        </h3>
        <Spinner />
      </div>
    );
  };

  const Carousel = () => {
    return (
      <>
        <ShowModal
          data={dataModal}
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
        />
        <div className="app__aside__carousel">
          {spinnerLoading ? (
            <SearchResults />
          ) : (
            <>
              <div className="app__aside__carousel__items">
                {results.map((item) => {
                  return (
                    <ExperienceItem
                      key={item._id}
                      {...item}
                      openModal={openModal}
                      typeref={"housings"}
                    />
                  );
                })}
              </div>

              <div className="app__aside__carousel__show-offers">
                <ShowOffers />
              </div>
            </>
          )}
        </div>
      </>
    );
  };
  const Code = () => {
    return (
      <div className="app__aside__code">
        <img src="./img/qr-code.svg" alt="" />
      </div>
    );
  };

  /**ASIDE FOOTER */
  const Footer = () => {
    return (
      <div className="app__aside__footer">
        <div className="app__aside__footer__text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto.
        </div>
      </div>
    );
  };

  const currentUser = useSelector(({ login }) => login.currentUser);

  return (
    <div className="app">
      {isLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/quiz" component={Quiz} />
            <Route exact path="/places" component={Offers} />
            <Route exact path="/experiences" component={Offers} />
            <Route exact path="/housings" component={Offers} />
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
