import React, { useEffect, useState } from "react";
//import Landing from "./pages/home/landing";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner/spinner.component";
import axios from "axios";

//import userDispatch to dispatch actions to our react-reduces
import { useDispatch } from "react-redux";

//import authtentication from firebase
import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";

const App = () => {
  //spinner status
  const [isLoading, setLoadingState] = useState(true);
  const [item, updateItem] = useState("places");
  const [results, setResults] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [spinnerLoading, setSpinnerLoading] = useState();

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

  /**
   * @component
   * Main component, it has inside hero and the carousel.
   * It works as a wrapper for the login / favorites /offers / quiz page.
   */
  const Main = () => {
    return (
      <div className="app__main">
        <Hero />
      </div>
    );
  };
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

  const Hero = () => {
    return (
      <React.Fragment>
        <div className="app__main__logo">
          <p>
            dtravel<span>.</span>
          </p>
        </div>
        <div className="app__main__intro">
          <h1>Get ready for your lifetime journey!</h1>
          <h5>
            Collection of the most beautiful places
            <br />
            experiences and unusual housing in the world
          </h5>
        </div>
        <Link to="/quiz">
          <button type="button" className="btn btn-primary btn-lg">
            Get Started
          </button>
        </Link>
      </React.Fragment>
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
        <nav
          className="aside-main-nav"
          onClick={({ target }) => updateItem(target.value)}
        >
          <button value="places">Places</button>
          <button value="experiences">Experiences</button>
          <button value="housings">Housings</button>
        </nav>
        <div className="aside-adventurous__mood">
          <ul className="aside-adventurous__mood-icons" onClick={updateFilters}>
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
  const Carousel = () => {
    return <div className="app__aside__carousel">Carousel</div>;
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

  return (
    <div className="app">
      {isLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Main /> <Aside />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
