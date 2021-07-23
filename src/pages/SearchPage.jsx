/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navigationbar from '../components/Navigationbar';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';
import Typebtn from '../components/Typebtn';
import Radiobtn from '../components/Radiobtn';

function SearchPage() {
  return (
    <>
      <div className="top-container">
        <span>top container</span>
        <LandingInfo />
      </div>
      <div className="bottom-container">
        <span>bottom continer</span>
        <div className="bottom-wrapper">
          <div>
            <InputURL plasceholder="검색어를 입력해 주세요." />
            <Link to="/upload" style={{ textDecoration: 'none' }}>
              <Button>
                <Stylespan>시작하기</Stylespan>
              </Button>
            </Link>
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
  margin-top: 50px;
  width: 12vw;
  height: 6vh;

  margin-left: 10px;

  /* text-align: center; */
  border-radius: 50px;

  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
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
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;

const InputFILE = styled.input`
  padding: 10px;
  margin-top: 30px;
  font-family: NanumSquare_L;
  width: 100%;
  /* outline: none; */
  font-size: 15px;
  display: absolute;

  transform: translate(40%);
`;

export default SearchPage;
