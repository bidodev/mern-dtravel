import React from "react";
import "./input.component.styles.scss";

const FormInput = ({ handleInputValue, label, ...restProps }) => {
  return (
    <div className="group">
      <input
        className="form-input"
        onChange={handleInputValue}
        {...restProps}
      ></input>
      {label ? (
        <label
          className={`${
            restProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
