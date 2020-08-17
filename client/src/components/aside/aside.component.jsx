import React from "react";
import Header from "./header/header.component";
import Discover from "./discover/discover.component";
import Search from "./search/search.component";
import { useSelector } from "react-redux";
import AdventurousMood from "./adventurousmood/adventurousmood.component.jsx";

function Aside() {
  const LoginPage = ({ CurrentUser }) => {
    return CurrentUser === null ? (
      ""
    ) : (
        <div>Welcome: {currentUser.displayName}</div>
    );
  };

  const NotSignedIn = () => {
    return (
      <React.Fragment>
        <Search />
        <Discover />
        <AdventurousMood />
      </React.Fragment>
    );
  };

  const currentUser = useSelector(({ login }) => login.currentUser);
  return (
    <div className="aside">
      <Header />
      {currentUser ? <LoginPage currentUser={currentUser} /> : <NotSignedIn />}
    </div>
  );
}

export default Aside;
