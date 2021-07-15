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
        </div>
        <div style={{ backgroundColor: 'blue', height: '38vh' }}>
          <span>bottom continer</span>
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
