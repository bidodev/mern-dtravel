import React from "react";
import { useDispatch } from "react-redux";
import "./search.component.styles.scss";

function Search() {
  //1. Use dispatch
  const dispatch = useDispatch();

  //2. Get the input field value
  const textInput = React.useRef();

  const submitValues = (event) => {
    event.preventDefault();
  
    setTimeout(() => {
      dispatch({ type: "UPDATE_INPUT", payload: textInput.current.value });
    }, 1500);
  };

  return (
    <div className="aside-search">
      <span>
        <ion-icon name="search-outline"></ion-icon>
      </span>
        <input
          onChange={submitValues}
          type="search"
          placeholder="Where to?"
          ref={textInput}
        />
    </div>
  );
}
export default Search;
