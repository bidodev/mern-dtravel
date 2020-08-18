import React, { Fragment } from "react";
import './list.item.styles.scss'

function ListItem({ _id, productName, description, cover, imgs, continent, price, type }) {

  //grab the url and description from the cover object.
  const { url} = cover;

  return (
    <div className="offers-item">
      <Fragment>
        <h3>{productName.charAt(0).toUpperCase() + productName.slice(1)}</h3>
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
          {continent.charAt(0).toUpperCase() + continent.slice(1)}
        </p>
        <p>
          <ion-icon name="cash-outline"></ion-icon>: &nbsp; {price}
        </p>
        <p className="description">{description}</p>
      </Fragment>
    </div>
  );
}

export default ListItem;
