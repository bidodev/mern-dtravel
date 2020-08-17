import React from "react";
import "./custom-button.styles.scss";

function CustomButton({ children, isGoogleSingIn, ...restProps }) {
  return (
    <button
      className={`${isGoogleSingIn ? "google-sign-in" : null} custom-button `}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default CustomButton;
