/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import styled from 'styled-components';
import Navigationbar from '../components/Navigationbar';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';

function MyPage() {
  return (
    <>
      {/* <div className="top-container">
        <div className="top-wrapper">
          <div className="landing-slide-slogan">
          <span>o</span>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="bottom-wrapper">
        <span>ok</span>
        </div>
      </div> */}

      <div className="main-grid-container">
        <div className="main-grid-item top">
          <LandingInfo />
        </div>
        <div className="main-grid-item mid">
          <span>MID</span>
        </div>
        <div className="main-grid-item bot">
          <div style={{ padding: '50px' }}>
            <div style={{ padding: '5px' }}>
              <Label>Language : </Label>
              <input type="radio" id="kor" name="kor" value="ko-KR" />
              <Label htmlFor="ko-KR">KOREAN</Label>
              <input type="radio" id="eng" name="eng" value="en-US" />
              <Label htmlFor="en-US">ENGLISH</Label>
            </div>
            <div style={{ padding: '5px' }}>
              <Label>Video type : </Label>
              <input type="radio" id="youtube" name="youtube" value="0" />
              <Label htmlFor="youtube">URL</Label>
              <input type="radio" id="local" name="local" value="1" />
              <Label htmlFor="local">FILE</Label>
            </div>

            {/* <Radiobtn type="Language : " A="KOREAN" B="ENGLISH" />
            <Radiobtn type="Video type : " A="FILE" B="URL" /> */}
            <form encType="multipart/form-data">
              <InputURL placeholder="youtube link를 입력해 주세요." />
            </form>
            <ErrLabel>에러이다</ErrLabel>
          </div>
          <div className="button-pos">
            <Button>
              {/* <Link to="/search?id=" style={{ textDecoration: 'none' }}> */}
              <Stylespan>시작하기</Stylespan>
              {/* </Link> */}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const Button = styled.button`
  background: #fa605a;

  cursor: pointer;

  font-size: 20px;

  color: white;

  border: none;
  /* margin-top: 50px; */
  width: 180px;
  height: 50px;

  /* margin-left: 10px; */

  /* text-align: center; */
  border-radius: 50px;

  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  /* position: absolute; */
`;

const ErrLabel = styled.label`
  font-size: 15px;
  font-family: 'NanumSquare_R';
  color: #fa605a;
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

const InputURL = styled.input`
  padding: 10px;
  margin-top: 40px;
  border-radius: 10px;
  border: 1px solid #404040;
  width: 900px;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;

const InputFILE = styled.input`
  padding: 10px;
  margin-top: 30px;
  font-family: NanumSquare_L;
  width: 900px;
  /* outline: none; */
  font-size: 15px;
  display: absolute;

  transform: translate(20%);
`;

// 버튼모양
const Label = styled.label`
  font-family: NanumSquare_EB;
  color: #404040;
`;

export default MyPage;
