import React, { useEffect, useState } from "react";
import axios from "axios";
import ExperienceItem from "./list.item.component";

/* import smoothScroll from "./smoothScroll" */
import "./offers.component.styles.scss";

const Offers = ({ match }) => {
  //console.log(match.path);

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    axios(
      `http://localhost:8000/api/v1/data${match.path}?page=${page}&limit=3`
    ).then((res) => {
      const { data, totalItems } = res.data;
      setTotalItems(totalItems);
      setResults(data.results);
    });
  }, [match.path, page]);

  const generatePages = (items) => {
    let html = [];
    let counter = 1;
    for (let i = 1; i < items; i += 3) {
      html.push(<button value={counter}>{counter}</button>)
      counter++;
    }
    console.log(html)
    return html;
  };

  return (
    <div className="offers-wrapper">
      <div className="display">
        {results.map((item) => (
          <ExperienceItem key={item._id} {...item} />
        ))}
      </div>
      <ul onClick={(event) => setPage(event.target.value)}>
        {generatePages(totalItems)}
      </ul>
    </div>
  );
};

export default Offers;
