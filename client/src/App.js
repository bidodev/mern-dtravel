import React, { useEffect, useState } from "react";
//import Landing from "./pages/home/landing";
import { Link } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import axios from "axios";

//import userDispatch to dispatch actions to our react-reduces
import { useDispatch } from "react-redux";

//import authtentication from firebase
import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";

const App = () => {
  const [isLoading, setLoadingState] = useState(true);

  //Use dispatch, similar to connect when not using Hooks
  const dispatch = useDispatch();

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
  });

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
    return <div className="app__aside__header">Header</div>;
  };
  const Filters = () => {
    return <div className="app__aside__filters">Filters</div>;
  };
  const Carousel = () => {
    return <div className="app__aside__carousel">Carousel</div>;
  };
  const Code = () => {
    return <div className="app__aside__code">Qr Code</div>;
  };
  const Footer = () => {
    return <div className="app__aside__footer">Footer</div>;
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
