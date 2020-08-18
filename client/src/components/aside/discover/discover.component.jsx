import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./discover.component.styles.scss";

import ShowModal from "../../modal/offer.component";
import ExperienceItem from "./experiences/experience.item.component";

const Discover = () => {
  const [item, updateItem] = useState("places");
  const [results, setResults] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    axios(`http://localhost:8000/api/v1/data/${item}?page=1&limit=2`).then((res) => {
      const { data } = res.data;
      setResults(data.results);
    });
  }, [item]);

  /**
   * 1. This function set the status of the Modal to Open.
   * 2. It updates the local state with the Data to render the modal.
   * 3. It checks if the item is on the Favorites and pass (false or true)
   */
  const openModal = (props) => {
    /**
     * update localState with modal state/data
     */
    setIsOpen(true);
    setDataModal(props);
  };

  /**
   * This function update the local state and close the modal.
   */
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="aside-main">
      <h2>Discover</h2>
      <nav
        className="aside-main-nav"
        onClick={({ target }) => updateItem(target.value)}
      >
        <button value="places">Places</button>
        <button value="experiences">Experiences</button>
        <button value="housings">Housings</button>
      </nav>
      <div className="aside-adventurous__mood">
        <ul className="aside-adventurous__mood-icons">
          <li>
            <ion-icon id="tropical" name="sunny-outline"></ion-icon>
          </li>

          <li>
            <ion-icon id="winter" name="snow-outline"></ion-icon>
          </li>

          <li>
            <ion-icon id="mountain" name="map-outline"></ion-icon>
          </li>
          <li>
            <ion-icon id="cycling" name="bicycle"></ion-icon>
          </li>
          <li>
            <ion-icon id="city" name="business-outline"></ion-icon>
          </li>
        </ul>
      </div>

      <ShowModal
        data={dataModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />

      <div className="aside-main__carrousel">
        {results.map((item) => {
          return (
            <ExperienceItem
              key={item._id}
              {...item}
              openModal={openModal}
              typeref={"housings"}
            />
          );
        })}
      </div>
      <div className="show-all">
        <Link to="offers">Show All Offers</Link>
      </div>
    </div>
  );
};

export default Discover;
