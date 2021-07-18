/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';
import Typebtn from '../components/Typebtn';

function MainPage() {
  return (
    <>
      <div style={{ height: '89vh', width: '100vw' }}>
        {/* top container + bottom container */}
        <div
          className="top-container"
          style={{ backgroundColor: 'red', height: '51vh', width: '100vw' }}
        >
          <span>top container</span>
          <LandingInfo />
        </div>
        <div
          style={{ backgroundColor: 'blue', height: '38vh', width: '100vw' }}
        >
          <span>bottom continer</span>
          <div className="bottom-wrapper">
            <Typebtn />
            <Button>
              <Link to="/upload" style={{ textDecoration: 'none' }}>
                <Stylespan>시작하기</Stylespan>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div style={{ height: '5vh', width: '100vw' }}>
        <Footer />
      </div>
    </>
  );
}

const Button = styled.button`
  background: #fa605a;

  cursor: pointer;

  font-size: 20px;

  color: white;

  border: none;
  margin-top: 50px;
  width: 12vw;
  height: 6vh;

  margin-left: 10px;

  /* text-align: center; */
  border-radius: 50px;

  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
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

export default MainPage;
