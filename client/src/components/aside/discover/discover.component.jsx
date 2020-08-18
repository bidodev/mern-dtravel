import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useSelector } from "react-redux";
import "./discover.component.styles.scss";
import { Link } from "react-router-dom";

import ShowModal from "../../modal/offer.component";
import ExperienceItem from "./experiences/experience.item.component";

const Discover = () => {
  const [item, updateItem] = useState("places");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios(`http://localhost:8000/api/v1/data/${item}`).then((res) => {
      const { data } = res.data;
      setResults(data.places);
    });
  }, [item]);

  //1. We have to select our full data from the state
  //const fullData = useSelector(({ data }) => data);

  //2. Check which input the user passed..
  //const searchInput = useSelector((state) => state.searchInput);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});

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
        onClick={({target}) => updateItem(target.value)}
      >
        <button value="places">Places</button>
        <button value="experiences">Experiences</button>
        <button value="housings">Housings</button>
      </nav>

      <ShowModal
        data={dataModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />

      <div className="aside-main__carrousel">
        {results.map((item) => {
          return (
            <ExperienceItem
              key={item.id}
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
