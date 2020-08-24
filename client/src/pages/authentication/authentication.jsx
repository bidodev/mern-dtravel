import React from "react";
import "./authentication.styles.scss";

//signIn Component
import SignIn from "../../components/signin/signin.component";
import SignUp from "../../components/signup/signup.component";

const Authentication = () => {
  return (
    <div className="app__authentication">
      <SignIn />
      <SignUp />
    </div>
  );
};
export default Authentication;
