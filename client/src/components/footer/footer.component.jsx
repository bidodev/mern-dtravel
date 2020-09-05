import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as ThemeIcon } from './nightmode.svg';
import './footer.component.styles.scss';

/**ASIDE FOOTER */
const Footer = () => {
  const dispatch = useDispatch();

  return (
    <div className="app__aside__footer">
      <button onClick={() => dispatch({ type: 'SET_THEMA' })}>
        <ThemeIcon />
      </button>
      <div className="app__aside__footer__text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto.
      </div>
    </div>
  );
};

export default Footer;
