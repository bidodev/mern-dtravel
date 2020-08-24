import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Spinner from '../spinner/spinner.component'
import ExperienceItem from '../experiences/experience.item.component';
import ShowModal from '../modal/offer.component';

const Carousel = () => {
/** Carousel */
  const iconStatus = useSelector(({ filters }) => filters.mood);
  const menuItem = useSelector(({ filters }) => filters.menuItem);
  const [results, setResults] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [spinnerLoading, setSpinnerLoading] = useState();

  useEffect(() => {
    setSpinnerLoading(true);
    axios(`http://localhost:8000/api/v1/data/${menuItem}?page=1&limit=2`).then(
      (res) => {
        const { data } = res.data;
        setResults(data.results);
        setTimeout(() => {
          setSpinnerLoading(false);
        }, 1000);
      }
    );
  }, [menuItem, iconStatus]);

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
      history.push(menuItem);
    }

    return (
      <button type="button" onClick={handleClick}>
        Show all {`${menuItem}`}
      </button>
    );
  };

  const SearchResults = () => {
    return (
      <div className="search-results">
        <h3>Searching for {iconStatus} {menuItem}...</h3>
        <Spinner />
      </div>
    );
  };
  return (
    <>
      <ShowModal
        data={dataModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />
      <div className="app__aside__carousel">
        {spinnerLoading ? (
          <SearchResults />
        ) : (
          <>
            <div className="app__aside__carousel__items">
              {results.map((item) => {
                return (
                  <ExperienceItem
                    key={item._id}
                    {...item}
                    openModal={openModal}
                    typeref={'housings'}
                  />
                );
              })}
            </div>

            <div className="app__aside__carousel__show-offers">
              <ShowOffers />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Carousel;
