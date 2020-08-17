import React from "react";
import "./adventurousmood.component.scss";

import { useDispatch } from "react-redux";

const AdventurousMood = () => {
  // use Redux Hook Dispatch instead of connect
  const dispatch = useDispatch();

  // function to update our redux state
  const submitValues = (event) => {
    const valueMood = event.target.id;

    //Update Search input to simulate a search with specific keywords..
    dispatch({ type: "UPDATE_INPUT", payload: valueMood });
  };

  return (
    <div className="aside-adventurous__mood">
      <ul className="aside-adventurous__mood-icons" onClick={submitValues}>
        <li>
          <ion-icon id="tropical" name="sunny-outline"></ion-icon>
          <span>Tropical</span>
        </li>

        <li>
          <ion-icon id="winter" name="snow-outline"></ion-icon>
          <span>Winter</span>
        </li>

        <li>
          <ion-icon id="mountain" name="map-outline"></ion-icon>
          <span>Mountains</span>
        </li>
        <li>
          <ion-icon id="cycling" name="bicycle"></ion-icon>
          <span>Cycling</span>
        </li>
        <li>
          <ion-icon id="city" name="business-outline"></ion-icon>
          <span>City</span>
        </li>
      </ul>
    </div>
  );
};

export default AdventurousMood;
