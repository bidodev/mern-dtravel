import React, { useEffect, useState } from "react";
import axios from "axios";
import ExperienceItem from "./list.item.component";

/* import smoothScroll from "./smoothScroll" */
import "./offers.component.styles.scss";

const Offers = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios("http://localhost:8000/api/v1/data/places").then((res) => {
      const { data } = res.data;
      setResults(data.results);
    });
  });

  return (
    <div className="offers-wrapper">
      {results.map((item) => (
        <ExperienceItem key={item._id} {...item} />
      ))}
    </div>
  );
};

export default Offers;
