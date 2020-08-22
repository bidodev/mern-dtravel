import React, { useEffect, useState } from "react";
import Landing from "./pages/home/landing";
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

  return <div className="App">{isLoading ? <Spinner /> : <Landing />}</div>;
};

export default App;
