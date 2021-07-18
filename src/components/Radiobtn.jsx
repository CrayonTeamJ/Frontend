/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import '../App.css';
import styled from 'styled-components';

function Radiobtn(props) {
  return (
    <div style={{ padding: '10px' }}>
      <form>
        <Label>{props.type}</Label>
        <input type="radio" id="huey" name="drone" value="huey" checked />
        <Label htmlFor="huey">{props.A}</Label>
        <input type="radio" id="dewey" name="drone" value="dewey" />
        <Label htmlFor="dewey">{props.B}</Label>
      </form>
    </div>
  );
}

// 버튼모양
const Label = styled.label`
  font-family: NanumSquare_EB;
  color: #404040;
`;

export default Radiobtn;
