import React, { useEffect, useState } from "react";
import axios from "axios";
import ExperienceItem from "./list.item.component";

/* import smoothScroll from "./smoothScroll" */
import "./offers.component.styles.scss";

const Offers = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios(
      `http://localhost:8000/api/v1/data/places?page=${page}&limit=3`
    ).then((res) => {
      const { data } = res.data;
      setResults(data.results);
    });
  }, [page]);

  return (
    <div className="offers-wrapper">
      <div className="display">
      {results.map((item) => (
        <ExperienceItem key={item._id} {...item} />
      ))}
      </div>
      <ul onClick={(event) => setPage(event.target.value)}>
        <button value="1">1</button>
        <button value="2">2</button>
        <button value="3">3</button>
      </ul>

    </div>
  );
};

export default Offers;
