/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
// import { usePromiseTracker } from 'react-promise-tracker';

const LoadingPage = (props) => (
  //   const { promiseInProgress } = usePromiseTracker({ area: props.area });
  <div>
    <div className="top-container">
      <Styleh1>NOW PROCESSING</Styleh1>
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
      <span
        style={{
          fontSize: '1.5vw',
          fontFamily: 'NanumSquare_L',
          position: 'absolute',
          textAlign: 'center',
          bottom: '35%',
        }}
      >
        {props.message}
        <br />
        잠시만 기다려 주세요.
      </span>
    </div>
    <div className="bottom-container">
      <></>
    </div>
  </div>
);
const Styleh1 = styled.h1`
  /* margin: 0; */
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 4.5vh;
  text-align: center;
  font-family: 'BwSurco';
  color: #404040;
`;

export default LoadingPage;
