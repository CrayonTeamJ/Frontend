/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
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
    text: '영상에 등장하는 인물이 대사를 하는 장면을 검색해 보세요',
  },
];
function Typebtn() {
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
            />
            <Label htmlFor={type.name} img={type.img}>
              <img
                src={type.img}
                style={{
                  width: '50%',
                  display: 'flex',
                  transform: 'translate(50%, 50%)',
                }}
              />
              <StyleSpan>{type.title}</StyleSpan>
              <br />
              <StyletextSpan>{type.text}</StyletextSpan>
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
  width: 80vw;
  margin-top: 0px;
  padding: 0px;
  /* border: 1px solid black; */
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
  /* display: inline; */
  bottom: 7vh;
  padding-bottom: 5px;
  /* margin-left: 30px;
  margin-top: 100px; */
`;

const StyletextSpan = styled.span`
  font-family: NanumSquare_L;
  font-size: 10px;
  color: #5b5b5b;
  position: absolute;
  bottom: 4vh;
  /* line-height: 1.5vh; */
  /* padding-left: 30px; */
`;
export default Typebtn;
