/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';

function MyPage() {
  return (
    <>
      <div className="top-container">
        <span>MYPAGE</span>
      </div>
      <div className="bottom-container">
        <span>bottom continer</span>
        {/* <div className="bottom-wrapper">
            <span>
              button 3개가 들어가야 하는데 얘는 아마 라디오버튼이므로 일단은
              보류
            </span>
          </div> */}
      </div>
    </>
  );
}

export default MyPage;
