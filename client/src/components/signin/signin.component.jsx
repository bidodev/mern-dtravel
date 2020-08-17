import React, { useState } from "react";
import "./signin.component.styles.scss";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import FormInput from "../forms/input.component";
import CustomButton from "../custom-button/custom-button.component";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //update redux
  const handleLoginData = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(userEmail, userPassword);
      setUserEmail("")
      setUserPassword("")
      alert("Logged with Sucess")
      
    } catch (error) {
      console.log("Error in the login", error.message)
    }
  };

  //update localState
  const handleInputValue = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case "email":
        return setUserEmail(value);
      case "password":
        return setUserPassword(value);
      default:
    }
  };

  return (
    <div>
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>
      </div>
      <form onSubmit={handleLoginData}>
        <FormInput
          name="email"
          type="email"
          value={userEmail}
          required
          label="email"
          handleInputValue={handleInputValue}
        />
        <FormInput
          name="password"
          type="password"
          value={userPassword}
          required
          label="password"
          handleInputValue={handleInputValue}
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSingIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
