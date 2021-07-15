/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';

function MainPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div style={{ height: '6vh' }}>
        <Navigationbar />
      </div>
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
            <span>
              button 3개가 들어가야 하는데 얘는 아마 라디오버튼이므로 일단은
              보류
            </span>
          </div>
        </div>
      </div>
      <div style={{ height: '5vh' }}>
        <Footer />
      </div>
    </div>
  );
}

export default MainPage;
