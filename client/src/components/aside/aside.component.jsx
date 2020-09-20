import React from 'react';
import './aside.styles.scss';

/* Components which compouse the Aside Navbar */
import Header from '../header/header.component';
import Filters from '../filters/filters.component';
import Carousel from '../carousel/carousel.component';
import Search from '../search/search.component';
import Footer from '../footer/footer.component';

const Aside = () => (
  <div className="app__aside">
    <Header />
    <Filters />
    <Carousel />
    <Footer />
  </div>
);

export default Aside;
