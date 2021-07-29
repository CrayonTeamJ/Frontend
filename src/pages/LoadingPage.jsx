/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

// loading 창 (서버에서 돌아오는 시간동안 보여줄 화면)

const LoadingPage = (props) => (
  <div className="main-container">
    <div className="main-grid-container">
      <div className="main-grid-item top">
        <Styleh1>NOW PROCESSING</Styleh1>
      </div>
      <div className="main-grid-item mid">
        <Loader
          style={{
            width: '100%',
            height: '100',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '10',
          }}
          type="ThreeDots"
          color="#fa506a"
          height="100"
          width="100"
        />
      </div>
      <div className="main-grid-item bot">
        <span
          style={{
            fontSize: '1.5vw',
            fontFamily: 'NanumSquare_L',

            bottom: '40%',
          }}
        >
          {props.message}
          <br />
          잠시만 기다려 주세요.
        </span>
      </div>
    </div>
  </div>
);
const Styleh1 = styled.h1`
  /* margin: 0; */
  margin-top: 200px;
  margin-bottom: 40px;
  font-size: 4.5vh;
  text-align: center;
  font-family: 'BwSurco';
  color: #404040;
`;

export default LoadingPage;
