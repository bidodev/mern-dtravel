import React, { forwardRef }  from "react";
import { useDispatch } from "react-redux";
import Btn from "./btn.component"

const inputObj = {  }
const QuestionItem = forwardRef(({id, question, variants, style}, ref) => {
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    const e = event.target;
    inputObj[e.name] = e.value;
    const quizInput = Object.values(inputObj);
    dispatch({ type: "UPDATE_INPUT", payload: quizInput});
  };
  const btns = variants.map((variant, index) => (
    <Btn
    key = {index}
    name = {id}
    variant = {variant}
    onSubmit = {onSubmit}
  />
    ));
    return (
        <div id={id} ref={ref} className = "quiz-item" style = {style}>
        <h3>{question}</h3>
        {btns}
    </div>
    );
  });

  export default QuestionItem;