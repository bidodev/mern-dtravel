import React, { useEffect, useState } from "react";
//import Landing from "./pages/home/landing";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner/spinner.component";
import ExperienceItem from "./components/aside/discover/experiences/experience.item.component";
import axios from "axios";

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

  /**
   * @component
   * Main component, it has inside hero and the carousel.
   * It works as a wrapper for the login / favorites /offers / quiz page.
   */
  const url = "./background/luca-bravo.jpg";
  let imgStyle = {
    backgroundSize: "cover",
    backgroundImage: `linear-gradient(to left bottom,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.7)
          ), url("${url}")`,
  };

  const Main = () => {
    return (
      <div className="app__main" style={imgStyle}>
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
