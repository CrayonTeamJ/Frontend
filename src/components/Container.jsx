/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import '../App.css';
import styled from 'styled-components';
import LandingInfo from './LandingInfo';

// 안쓰일듯 형식만지정해준거임 ( 탑 + 바텀 컨테이너 - > 매인부분 )

function Container({ child }) {
  return (
    <>
      <div
        className="top-container"
        style={{ backgroundColor: 'red', height: '51vh' }}
      >
        <span>top container</span>
        <LandingInfo />
      </div>
      <div style={{ backgroundColor: 'blue', height: '38vh' }}>
        <span>bottom continer</span>
        <div className="landing-button">
          <span>
            button 3개가 들어가야 하는데 얘는 아마 라디오버튼이므로 일단은 보류
          </span>
        </div>
      </div>
    </>
  );
}

export default Container;
