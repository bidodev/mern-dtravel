import React from "react";
import "./header.component.styles.scss";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth } from "../../../firebase/firebase.utils";

const Header = () => {
  //load the currentUser propertie from the redux store.
  const currentUser = useSelector(({ login }) => login.currentUser);

  return (
    <header className="aside-header">
      <nav className="aside-header__nav">
        <div className="aside-header__nav-icon">
          <img src="./img/dt.svg" alt="" />
        </div>
        <ul>
          <div className="aside-header__nav-search"><ion-icon name="search-outline"></ion-icon></div>
          <li>
            <Link to="/">Home</Link>
          </li>
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
    </header>
  );
};

export default Header;
