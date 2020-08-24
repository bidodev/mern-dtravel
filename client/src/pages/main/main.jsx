import React from "react";
import "./main.styles.scss";

import Hero from "../../components/hero.component";

/**
 * @component
 * Main component, it has inside hero and the carousel.
 * It works as a wrapper for the login / favorites /offers / quiz page.
 */
const url = "./background/luca-bravo.jpg";
let imgStyle = {
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(to left bottom,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.7)
          ), url("${url}")`,
};

const Main = () => {
  return (
    <div className="app__main" style={imgStyle}>
      <Hero />
    </div>
  );
};
export default Main;
