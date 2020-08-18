import React, { Fragment } from "react";
import "./list.item.styles.scss";

import sanitizeNames from '../../../helpers/sanitezeNames';
import filterPrices from '../../../helpers/filterPrices';


function ListItem({
  _id,
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
        <p>
          <ion-icon name="navigate-outline"></ion-icon>: &nbsp;
          {sanitizeNames(continent)}
        </p>
        <p>
          <ion-icon name="cash-outline"></ion-icon>: {filterPrices(price)}
        </p>
        <p className="description">{description}</p>
      </Fragment>
    </div>
  );
}

export default ListItem;
