import React from "react";
import "./aside.styles.scss";

/* Aside Components */
import Header from '../header.component';
import Filters from '../filters.component';
import Carousel from '../carousel.component'
import Code from '../qr-code.component';
import Footer from '../footer.component';

const Aside = () => {
  return (
    <div className="app__aside">
      <Header />
      <Filters />
      <Carousel />
      <Code />
      <Footer />
    </div>
  );
};

export default Aside;
