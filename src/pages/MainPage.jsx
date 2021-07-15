/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import imgback from '../img/backimg.png';
import Navbtn from '../components/Navbtn';

function MainPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div style={{ height: '6vh' }}>
        <Navigationbar />
      </div>
      <div style={{ height: '89vh' }}>
        <div
          className="top-container"
          style={{ backgroundColor: 'red', height: '51vh' }}
        >
          <span>top container</span>
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
                btnlink="/"
                className="start_btn"
                color="#ffffff"
              />
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: 'blue', height: '38vh' }}>
          <span>bottom continer</span>
          <div className="landing-button">
            <span>
              button 3개가 들어가야 하는데 얘는 아마 라디오버튼이므로 일단은
              보류
            </span>
          </div>
        </div>
      </div>
      <div
        className="footer"
        style={{ backgroundColor: 'green', height: '5vh' }}
      >
        <span>© SeaFLAG, Inc. 2021. 2021-SiliconValley-TeamJ</span>
      </div>
    </div>
  );
}

export default MainPage;
