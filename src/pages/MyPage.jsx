/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';

function MyPage() {
  return (
    <>
      <div style={{ height: '89vh', width: '100vw' }}>
        {/* top container + bottom container */}
        <div
          className="top-container"
          style={{ backgroundColor: 'red', height: '51vh', width: '100vw' }}
        >
          <span>MYPAGE</span>
        </div>
        <div
          style={{ backgroundColor: 'blue', height: '38vh', width: '100vw' }}
        >
          <span>bottom continer</span>
          <div className="bottom-wrapper">
            <span>
              button 3개가 들어가야 하는데 얘는 아마 라디오버튼이므로 일단은
              보류
            </span>
          </div>
        </div>
      </div>
      <div style={{ height: '5vh', width: '100vw' }}>
        <Footer />
      </div>
    </>
  );
}

export default MyPage;
