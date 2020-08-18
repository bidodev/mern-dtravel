import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";

import "./landing.title.styles.scss";

import { Carousel } from "react-responsive-carousel";

const Landing = () => {
  const backgrounds = useSelector((state) => state.data.backgrounds);

  const getConfigurableProps = {
    showArrows: true,
    showStatus: false,
    showIndicators: true,
    infiniteLoop: true,
    showThumbs: false,
    useKeyboardArrows: true,
    autoPlay: true,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    thumbWidth: 100,
    selectedItem: 0,
    interval: 60000,
    transitionTime: 400,
    swipeScrollTolerance: 5,
  };

  return (
    <div className="landing-wrapper">
      <Carousel {...getConfigurableProps}>
        {backgrounds.map(({ _id, description, url }) => (
          <div key={_id}>
            <img src={`./background/${url}`} alt={description} />
            {/* <p className="legend">Legend</p> */}
          </div>
        ))}
      </Carousel>

      <div className="content">
        <div className="logo">
          <p>
            dtravel<span>.</span>
          </p>
        </div>
        <div className="b">
        <h1>Get ready for your lifetime journey!</h1>
        <h5>
            Collection of the most beautiful places<br />experiences and unusual
          housing in the world
        </h5>
                  <Link to="/quiz">
          <button type="button" className="btn btn-primary btn-lg">
            Get Started
          </button>
        </Link>
          </div>

      </div>
    </div>
  );
};

export default Landing;
