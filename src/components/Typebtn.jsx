/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styled from 'styled-components';
import audio from '../img/conversation.png';
import image from '../img/speech.png';
import both from '../img/video-player.png';

const Types = [
  {
    name: 'image',
    img: image,
    title: '인물 검색',
    text: '영상에 등장하는 인물을 검색해 보세요',
  },
  {
    name: 'audio',
    img: audio,
    title: '대사 검색',
    text: '영상에 등장하는 대사를 검색해 보세요',
  },
  {
    name: 'both',
    img: both,
    title: '대사 & 인물 검색',
    text: '영상에 등장하는 인물&대사 장면을 검색해 보세요',
  },
];

function Typebtn(props) {
  return (
    <>
      <ColorSelectorContainer>
        {Types.map((type) => (
          <div key={type.name}>
            <RadioButton
              id={type.name}
              type="radio"
              name="type-selector"
              value={type.name}
              onChange={props.onSelectCategory}
              checked={props.checked === type.name}
            />
            <Label htmlFor={type.name} img={type.img}>
              <div className="button-grid">
                <div className="button-grid-item">
                  <img
                    src={type.img}
                    style={{
                      width: '50%',
                      // transform: 'translate(50%, 50%)',
                    }}
                  />
                </div>
                <div className="button-grid-item">
                  <StyleSpan>{type.title}</StyleSpan>
                </div>
                <div className="button-grid-item">
                  <StyletextSpan>{type.text}</StyletextSpan>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </ColorSelectorContainer>
    </>
  );
}

const ColorSelectorContainer = styled.div`
  display: flex; // 내부 애들 옆으로 배치 가능하게하기
  justify-content: space-between; // 내부 애들 간격 일정하게 떨어지게하기
  width: 85vw;
  /* margin-top: 0px; */
  /* padding: 0px; */
  /* border: 1px solid black; */
`;

// 버튼모양
const Label = styled.label`
  /* display: inline-block; */
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: 16vw;
  height: 250px;
  border-radius: 25px;
  background-color: white;

  position: relative;

  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
  text-align: start;

  display: flex;
  /* y축기준 중앙 */
  align-items: center;
  /* y축 기준 내부에 요소들 끝으로 붙이기 */
  justify-content: center;
`;

// 선택느낌
const RadioButton = styled.input`
  display: none; // 라디오 버튼 사라지고 글씨만 남도록
  &:checked + ${Label} {
    background: center url(${(props) => props.img}) rgba(250, 96, 90, 0.3);
  }
`;

const StyleSpan = styled.span`
  font-family: NanumSquare_EB;
  position: relative;
  /* top: 7vh; */
  font-size: 15px;
  /* display: inline; */
  /* bottom: 14vw; */
  padding-bottom: 5px;
  line-height: 0vh;

  /* margin-left: 30px;
  margin-top: 100px; */
`;

const StyletextSpan = styled.span`
  font-family: NanumSquare_L;
  text-align: start;
  font-size: 10px;
  color: #5b5b5b;
  position: relative;
  /* top: 6vh; */
  /* bottom: 12vh; */
  line-height: 0vh;
  /* padding-left: 30px; */
`;
export default Typebtn;
