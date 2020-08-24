import React from "react";
import "./aside.styles.scss";
import Header from "../../components/header.component";

/**ASIDE FOOTER */
const Footer = () => {
  return (
    <div className="app__aside__footer">
      <div className="app__aside__footer__text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto.
      </div>
    </div>
  );
};

const Aside = () => {
  return (
    <div className="app__aside">
      <Header />

      {/* <Filters />
        <Carousel />
            <Code />
            */}
      <Footer />
    </div>
  );
};
export default Aside;
