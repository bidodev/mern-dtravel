import React, { useEffect } from "react";
import Landing from './pages/home/landing';

//import userDispatch to dispatch actions to our react-reduces
import { useDispatch } from "react-redux";

//import authtentication from firebase
import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";

const App = () => {

  //Use dispatch, similar to connect when not using Hooks
  const dispatch = useDispatch();

  //2. Similar to componentDidMount when using class components.
  useEffect(() => {
    //console.log("componentDidMount");
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
      //console.log("componetWillUnmount");
      unsubscribe();
    };
  });

  return (
    <div className="App">
     <Landing />
    </div>
  );
};

export default App;
