import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import ExperienceItem from './list.item.component';
import ShowModal from '../../components/modal/offer.component';

/* import smoothScroll from "./smoothScroll" */
import './offers.component.styles.scss';
Modal.setAppElement('#root');

const Offers = ({ match }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    axios(
      `/api/v1/data${match.path}?page=${page}&limit=3`
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
      html.push(<button value={counter}>{counter}</button>);
      counter++;
    }
    return html;
  };

  const CloseOffers = () => {
    let history = useHistory();
    function handleClick() {
      history.push('/');
    }

    return (
      <div className="close-circle-outline">
        <ion-icon name="close-circle-outline" onClick={handleClick}></ion-icon>
      </div>
    );
  };

  const openModal = (props) => {
    /**
     * update localState with modal state/data
     */
    console.log(props);
    setIsOpen(true);
    setDataModal(props);
  };

  /**
   * This function update the local state and close the modal.
   */
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ShowModal
        data={dataModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />
      <div className="offers-wrapper">
        <div className="display">
          <CloseOffers />
          <div className="dddd">
            {results.map((item) => (
              <ExperienceItem key={item._id} {...item} openModal={openModal} />
            ))}
          </div>
          <ul onClick={(event) => setPage(event.target.value)}>
            {generatePages(totalItems)}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Offers;
