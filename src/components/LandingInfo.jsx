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

function LandingInfo() {
  return (
    <>
      <div className="landing-info">
        <div className="landing-slide-slogan" style={{ display: 'flex' }}>
          {Types.map((type) => (
            <Label htmlFor={type.name} img={type.img}>
              <img
                src={type.img}
                style={{
                  width: '50%',
                  display: 'flex',
                  transform: 'translate(50%, 50%)',
                }}
              />
              <StyleSpanE>{type.title}</StyleSpanE>
              <br />
              <StyletextSpan>{type.text}</StyletextSpan>
            </Label>
          ))}
          <div style={{ marginLeft: '15px' }}>
            <span>원하는 인물을,</span>
            <br />
            <span>원하는 대사를,</span>
            <br />
            <span style={{ fontSize: '55px' }}>원하는 부분만.</span>
          </div>
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

const ColorSelectorContainer = styled.div`
  display: flex; // 내부 애들 옆으로 배치 가능하게하기
  justify-content: space-between; // 내부 애들 간격 일정하게 떨어지게하기
  width: 80vw;
  margin-top: 0px;
  padding: 0px;
  border: 1px solid black;
`;

// 버튼모양
const Label = styled.label`
  display: inline-block;
  padding-top: 3vh;
  padding-bottom: 3vh;
  padding-left: 3vh;
  padding-right: 3vh;
  width: 200px;
  height: 200px;
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

const StyleSpanE = styled.span`
  font-family: NanumSquare_EB;
  position: relative;
  font-size: 15px;
  top: 30px;
  /* margin-left: 30px;
  margin-top: 100px; */
`;

const StyletextSpan = styled.span`
  font-family: NanumSquare_L;
  font-size: 10px;
  color: #5b5b5b;
  top: 0px;
  /* padding-left: 30px; */
`;

export default LandingInfo;
