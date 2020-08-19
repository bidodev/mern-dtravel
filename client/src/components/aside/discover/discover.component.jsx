import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./discover.component.styles.scss";
import Spinner from "../../spinner/spinner.component";

import ShowModal from "../../intro/modal/offer.component";
import ExperienceItem from "./experiences/experience.item.component";

const Discover = () => {
  const [item, updateItem] = useState("places");
  const [results, setResults] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [spinnerLoading, setSpinnerLoading] = useState();

  const dispatch = useDispatch();
  const iconStatus = useSelector(({ filters }) => filters.mood);

  useEffect(() => {
    setSpinnerLoading(true);
    axios(`http://localhost:8000/api/v1/data/${item}?page=1&limit=2`).then(
      (res) => {
        const { data } = res.data;
        setResults(data.results);
        setTimeout(() => {
          setSpinnerLoading(false);
        }, 1000);
      }
    );
  }, [item, iconStatus]);

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

  const ShowOffers = () => {
    let history = useHistory();

    function handleClick() {
      history.push(item);
    }

    return (
      <button type="button" onClick={handleClick}>
        Show all {`${item}`}
      </button>
    );
  };

  // function to update our redux state
  const updateFilters = (event) => {
    const valueMood = event.target.id;

    //Update Search input to simulate a search with specific keywords..
    dispatch({ type: "UPDATE_MOOD", payload: valueMood });
  };

  const SearchResults = () => {
    return (
      <div className="search-results">
        
        <h3>
          Searching for {iconStatus} {item}...
        </h3>
        <Spinner />
      </div>
    );
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
        <ul className="aside-adventurous__mood-icons" onClick={updateFilters}>
          <li>
            {iconStatus === "tropical" ? (
              <ion-icon id="tropical" name="sunny"></ion-icon>
            ) : (
              <ion-icon id="tropical" name="sunny-outline"></ion-icon>
            )}
          </li>
          <li>
            {iconStatus === "winter" ? (
              <ion-icon id="winter" name="snow"></ion-icon>
            ) : (
              <ion-icon id="winter" name="snow-outline"></ion-icon>
            )}
          </li>
          <li>
            {iconStatus === "mountain" ? (
              <ion-icon id="mountain" name="map"></ion-icon>
            ) : (
              <ion-icon id="mountain" name="map-outline"></ion-icon>
            )}
          </li>
          <li>
            {iconStatus === "cycling" ? (
              <ion-icon id="cycling" name="bicycle"></ion-icon>
            ) : (
              <ion-icon id="cycling" name="bicycle-outline"></ion-icon>
            )}
          </li>
        </ul>
      </div>

      <ShowModal
        data={dataModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />

      <div className="aside-main__carrousel">
        {spinnerLoading ? (
          <SearchResults />
        ) : (
          <>
            <div className="bbb">
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
              <ShowOffers />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Discover;
