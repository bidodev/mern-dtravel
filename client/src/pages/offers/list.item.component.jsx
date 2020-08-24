import React, { Fragment } from "react";
import "./list.item.styles.scss";

import sanitizeNames from '../../helpers/sanitezeNames';
import filterPrices from '../../helpers/filterPrices';
import limitResults from '../../helpers/limiteDesc';

function ListItem({
  _id,
  country,
  productName,
  description,
  cover,
  imgs,
  continent,
  price,
  type,
}) {
  //grab the url and description from the cover object.
  const { url } = cover;

  return (
    <div className="offer-item">
      <Fragment>
        <h3>{sanitizeNames(productName)}</h3>
        <div className="img-container">
          <img
            className={"img-card"}
            key={_id}
            src={`./img/${type}/${url}`}
            alt={description}
          />
        </div>
        <div className="infos">
          <li>
            <ion-icon name="navigate-outline"></ion-icon>
            {sanitizeNames(country)}
          </li>
          <li>
            <ion-icon name="cash-outline"></ion-icon>
            {sanitizeNames(filterPrices(price))}
          </li>
        </div>
        <p className="description">{limitResults(description, 300)}</p>
      </Fragment>
    </div>
  );
}

export default ListItem;
