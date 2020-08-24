import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Filters = () => {
  const iconStatus = useSelector(({ filters }) => filters.mood);
  const menuItem = useSelector(({ filters }) => filters.menuItem);

  const dispatch = useDispatch();

  // function to update our redux state
  const updateFilters = (event) => {
    const valueMood = event.target.id;

    //Update Search input to simulate a search with specific keywords..
    dispatch({ type: 'UPDATE_MOOD', payload: valueMood });
  };

  // function to update our redux state
  const updateMenuItem = (event) => {
    const itemMenu = event.target.value;

    //Update Search input to simulate a search with specific keywords..
    dispatch({ type: 'UPDATE_MENU_ITEM', payload: itemMenu });
  };

  return (
    <div className="app__aside__filters">
      <h2>Discover</h2>
      <nav onClick={updateMenuItem}>
        <button
          className={menuItem === 'places' ? 'active' : ''}
          value="places"
        >
          Places
        </button>
        <button
          className={menuItem === 'experiences' ? 'active' : ''}
          value="experiences"
        >
          Experiences
        </button>
        <button
          className={menuItem === 'housings' ? 'active' : ''}
          value="housings"
        >
          Housings
        </button>
      </nav>
      <div className="app__aside__filters__mood">
        <ul onClick={updateFilters}>
          <li className={iconStatus === 'tropical' ? 'active' : ''}>
            {iconStatus === 'tropical' ? (
              <ion-icon id="tropical" name="sunny"></ion-icon>
            ) : (
              <ion-icon id="tropical" name="sunny-outline"></ion-icon>
            )}
          </li>
          <li className={iconStatus === 'winter' ? 'active' : ''}>
            {iconStatus === 'winter' ? (
              <ion-icon id="winter" name="snow"></ion-icon>
            ) : (
              <ion-icon id="winter" name="snow-outline"></ion-icon>
            )}
          </li>
          <li className={iconStatus === 'mountain' ? 'active' : ''}>
            {iconStatus === 'mountain' ? (
              <ion-icon id="mountain" name="map"></ion-icon>
            ) : (
              <ion-icon id="mountain" name="map-outline"></ion-icon>
            )}
          </li>
          <li className={iconStatus === 'cycling' ? 'active' : ''}>
            {iconStatus === 'cycling' ? (
              <ion-icon id="cycling" name="bicycle"></ion-icon>
            ) : (
              <ion-icon id="cycling" name="bicycle-outline"></ion-icon>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
