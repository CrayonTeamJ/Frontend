/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import '../App.css';
import Navbtn from './Navbtn';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
          <span style={{ fontSize: '55px' }}>원하는 부분만.</span>
        </div>
        <div className="landing-slide-button">
          <Button>
            <Link to="/detect" style={{ textDecoration: 'none' }}>
              <Stylespan>시작하기</Stylespan>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

const Button = styled.button`
  background: #fa605a;
  z-index: 5;
  cursor: pointer;

  display: block;
  font-size: 20px;

  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  display: flex;

  width: 12vw;
  height: 6vh;
  position: relative;
  margin-left: 10px;
  display: block;
  text-align: center;
  border-radius: 50px;
  cursor: pointer;

  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

const Stylespan = styled.span`
  position: relative;
  font-family: NanumSquare_B;
  color: white;
  font-size: 25px;
  // font-size: 1.6vw;
  opacity: 1;
  white-space: nowrap;
`;

export default LandingInfo;
