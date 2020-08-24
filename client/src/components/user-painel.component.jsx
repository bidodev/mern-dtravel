import React from "react";
import Header from "./header/header.component";
import Discover from "./discover/discover.component";
import Search from "./search/search.component";
import { useSelector } from "react-redux";

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
        {/* <Search /> */}
        <Discover />
      </React.Fragment>
    );
  };

  const currentUser = useSelector(({ login }) => login.currentUser);
  return (
    <div className="aside">
      <Header />
      {currentUser ? <LoginPage currentUser={currentUser} /> : <NotSignedIn />}
      <div className="aside-footer">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, praesentium.</div>
    </div>
  );
}

export default Aside;
