import React from "react";
import './hero.component.styles.scss';

import { Link } from "react-router-dom";
import CustomButton from '../custom-button/custom-button.component';

const Hero = () => {
  return (
    <React.Fragment>
      <div className="app__main__logo">
        <p>
          dtravel<span>.</span>
        </p>
      </div>
      <div className="app__main__intro">
        <h1>Get ready for your lifetime journey!</h1>
        <h5>
          Collection of the most beautiful places
          <br />
          experiences and unusual housing in the world
        </h5>
      </div>
      <Link to="/quiz">
      <CustomButton type="submit" size="small">Get Started</CustomButton>
      </Link>
    </React.Fragment>
  );
};

export default Hero;
