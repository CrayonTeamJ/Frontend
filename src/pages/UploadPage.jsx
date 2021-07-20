/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navigationbar from '../components/Navigationbar';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';
import Typebtn from '../components/Typebtn';
import Radiobtn from '../components/Radiobtn';

function UploadPage() {
  const [lang, setLang] = React.useState('');
  const [category, setCategory] = React.useState('1');
  const [link, setLink] = React.useState('');

  return (
    <>
      <div className="top-container">
        <LandingInfo />
      </div>
      <div className="bottom-container">
        <div className="bottom-wrapper">
          <div style={{ padding: '50px' }}>
            <Radiobtn type="Language : " A="KOREAN" B="ENGLISH" />
            <Radiobtn type="Video type : " A="FILE" B="URL" />
            {category === '0' ? (
              <InputURL placeholder="youtube link를 입력해 주세요." />
            ) : (
              <InputFILE type="file" />
            )}
          </div>

          <div className="button-pos">
            <Button>
              <Link to="/upload" style={{ textDecoration: 'none' }}>
                <Stylespan>시작하기</Stylespan>
              </Link>
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
  width: 12vw;
  height: 6vh;

  /* margin-left: 10px; */

  /* text-align: center; */
  border-radius: 50px;

  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  /* position: absolute; */
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
  width: 80%;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;

const InputFILE = styled.input`
  padding: 10px;
  margin-top: 30px;
  font-family: NanumSquare_L;
  /* width: 100%; */
  /* outline: none; */
  font-size: 15px;
  display: absolute;

  transform: translate(20%);
`;

export default UploadPage;
