/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import '../App.css';
import Navbtn from './Navbtn';
import styled from 'styled-components';

// top container내부의 설명파트

function LandingInfo() {
  return (
    <>
      <div className="landing-info">
        <div className="landing-slide-slogan">
          <span>원하는 인물을,</span>
          <br />
          <span>원하는 대사를,</span>
          <br />
          <span style={{ fontSize: '3.5vw' }}>원하는 부분만.</span>
        </div>
        <div className="landing-slide-button">
          <Navbtn
            btntype="시작하기"
            btnlink="/profile"
            className="start_btn"
            color="#ffffff"
          />
        </div>
      </div>
    </>
  );
}

export default LandingInfo;
