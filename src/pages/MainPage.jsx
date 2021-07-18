/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import styled from 'styled-components';
import Navigationbar from '../components/Navigationbar';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';
import Typebtn from '../components/Typebtn';

function MainPage() {
  return (
    <>
      <div style={{ height: '89vh' }}>
        {/* top container + bottom container */}
        <div
          className="top-container"
          style={{ backgroundColor: 'red', height: '51vh' }}
        >
          <span>top container</span>
          <LandingInfo />
        </div>
        <div style={{ backgroundColor: 'blue', height: '38vh' }}>
          <span>bottom continer</span>
          <div className="bottom-wrapper">
            <Typebtn />
          </div>
        </div>
      </div>
      <div style={{ height: '5vh' }}>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
