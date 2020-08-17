import React from "react";
import questionsFullData from "./questions.json";
import { Link } from "react-router-dom";
import QuestionItem from "./question-item.component";

import "./quiz.styles.scss";

const refCollection = {};
let currentFocus = 0;
const visible = "visible";
const opacity = 1;
const setVisible = (index) => {
  refCollection[index].style = `visibility: ${visible}; opacity: ${opacity}`;
};
const setInvisible = (index) => {
  refCollection[index].style = "";
};
const forward = () => {
  console.warn("previousFocus " + currentFocus);
  setInvisible(currentFocus);
  if (currentFocus < 3) {
    currentFocus++;
  } else {
    currentFocus = 0;
  }
  setVisible(currentFocus);
  console.warn("currentFocus " + currentFocus);
};
const back = () => {
  setInvisible(currentFocus);
  if (currentFocus > 0) {
    currentFocus--;
  } else {
    currentFocus = 3;
  }
  setVisible(currentFocus);
};

const Quiz = () => {
  const listItems = questionsFullData.map(({ ...props }, index) => (
    <QuestionItem
      key={index}
      ref={(currentRef) => {
        refCollection[index] = currentRef;
      }}
      id={index}
      {...props}
      style={!index ? { visibility: visible, opacity: opacity } : null}
    />
  ));
  return (
    <div className="quiz-main">
      <div className="home">
        <Link to="/">
          <button className="offers">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">HOME</span>
          </button>
        </Link>
      </div>
      <div className="back">
        <button onClick={back}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
      </div>
      <div className="quiz-list">{listItems}</div>
      <div className="forward">
        <button onClick={forward}>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
      <div className="quiz-to-offers">
        <button class="offers">
          <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
          </span>
          <span class="button-text">OFFERS</span>
        </button>
      </div>
      <div className="quiz-logo">
        <p>
          do the travel
          <span>.</span>
        </p>
      </div>
    </div>
  );
};

export default Quiz;
