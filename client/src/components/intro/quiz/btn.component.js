import React from 'react';

const Btn = (props) => {
    const variant = props.variant;
    const name = props.name;
    const onSubmit = props.onSubmit;
    return (
      <button value={variant.toString().toLowerCase()} name = {name} onClick={onSubmit}>
      {variant}
    </button>
    );
  }

  export default Btn;