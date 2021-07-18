/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import '../App.css';

function Radiobtn(props) {
  //   const changeRadioQ1 = (e) => {
  //     setQ1(e.target.value);
  //   };

  //   const changeRadioQ2 = (e) => {
  //     setQ2(e.target.value);
  //   };

  return (
    <>
      <div>
        <label htmlFor="asdf">
          {props.type}
          <input
            type="radio"
            id="asdf"
            name={props.A}
            value={props.A}
            checked
          />
          {props.A}
        </label>
        <label htmlFor="asdf">
          <input type="radio" id="asdf2" name={props.B} value={props.B} />
          {props.B}
        </label>
      </div>
    </>
  );
}

export default Radiobtn;
