import React, { useState, useEffect } from "react";
import "./experience.item.component.styles.scss";

import sanitizeNames from "../../../../helpers/sanitezeNames"


const Card = (props) => {
  const { id, cover, productName, country, openModal, type } = props;

  //grab the url and description from the cover object.
  const { url, description } = cover;

  const [isHovering, setIsHovering] = useState(false);


  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => openModal(props)}
    >
      <img
        //this code is ugly, please fix this shit at some point..
        //className={id === 404 ? "img-404" : "img-card"}
        className={"img-card"}
        key={id}
        src={`./img/${type}/${url}`}
        alt={description}
      />
      {isHovering && (
        <div>
          <li>
            <h4>{sanitizeNames(productName)}</h4>
          </li>
          <li>
            <ion-icon name="navigate-outline"></ion-icon>
            {sanitizeNames(country)}
          </li>
        </div>
      )}
    </div>
  );
};

export default Card;