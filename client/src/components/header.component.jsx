import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

//import authtentication from firebase
import { auth } from "../firebase/firebase.utils.js";

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

          <NavLink to="/">Home</NavLink>

          {currentUser ? <NavLink to="/favorites">Favorites</NavLink> : null}
          {currentUser ? (
            <button className="option-logged" onClick={() => auth.signOut()}>
              SIGN OUT
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
