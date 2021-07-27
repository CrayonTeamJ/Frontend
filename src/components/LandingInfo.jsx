/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import '../App.css';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import audio from '../img/conversation.png';
import image from '../img/speech.png';
import both from '../img/video-player.png';

// top container내부의 설명파트
const Types = [
  {
    name: 'image',
    img: image,
    title: '인물 검색',
    text: '영상에 등장하는 인물을 검색해 보세요',
  },
];

function LandingInfo({ children }) {
  return (
    <div
      style={{
        margin: '15px',
        fontFamily: 'NanumSquare_EB',
        lineHeight: '75px',
      }}
    >
      {/* <div className="top-wrapper">
        <div className="landing-slide-slogan" style={{ display: 'flex' }}> */}
      {children}
      <div style={{ fontSize: '60px' }}>
        <span>원하는 인물을,</span>
        <br />
        <span>원하는 대사를,</span>
        <br />
        <span style={{ fontSize: '70px' }}>원하는 부분만.</span>
      </div>
      {/* </div>
      </div> */}
    </div>
  );
}

const Stylespan = styled.span`
  position: relative;
  font-family: NanumSquare_B;
  color: white;
  font-size: 25px;
  // font-size: 1.6vw;
  opacity: 1;
  white-space: nowrap;
`;

// 버튼모양
const Label = styled.label`
  display: inline-block;
  padding-top: 3vh;
  padding-bottom: 3vh;
  padding-left: 3vh;
  padding-right: 3vh;
  width: 15vw;
  height: 27vh;
  border-radius: 25px;
  background-color: white;
  /* background: no-repeat center url(${(props) => props.img}) white;
  background-image: ${(props) => props.img}; */
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
  text-align: start;
`;

// 선택느낌
const RadioButton = styled.input`
  display: none; // 라디오 버튼 사라지고 글씨만 남도록
  &:checked + ${Label} {
    background: center url(${(props) => props.img}) no-repeat
      rgba(250, 96, 90, 0.3);
  }
`;

const StyleSpan = styled.span`
  font-family: NanumSquare_EB;
  position: absolute;
  font-size: 16px;
  /* display: inline; */
  bottom: 1vh;
  padding-bottom: 5px;
  letter-spacing: 0px;
  /* margin-left: 30px;
  margin-top: 100px; */
`;

const StyletextSpan = styled.span`
  font-family: NanumSquare_L;
  font-size: 10px;
  color: #5b5b5b;
  position: absolute;
  bottom: -1.5vh;
  letter-spacing: 0px;
  /* line-height: 1.5vh; */
  /* padding-left: 30px; */
`;

export default LandingInfo;
