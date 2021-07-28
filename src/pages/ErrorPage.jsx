/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import Template from '../components/Template';
import noResult from '../img/not-found.png';

function ErrorPage() {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const { errtype } = query;

  const history = useHistory();
  const onSumbitHandler = (e) => {
    history.goBack();
  };

  return (
    <>
      <div className="main-container">
        {/* <span>main</span> */}

        <Template>
          <Styleh1> 500 Server Error </Styleh1>
          <h1 style={{ textAlign: 'center', fontSize: '100px' }}> :( </h1>
          <span
            style={{
              fontSize: '20px',
              fontFamily: 'NanumSquare_L',
              position: 'absolute',
              bottom: '120px',
              left: '160px',
              textAlign: 'center',
            }}
          >
            "{errtype}"
            <br />
            작업을 수행 중 에러가 발생했습니다.
          </span>

          <Button onClick={onSumbitHandler}>
            <Stylespan>이전 페이지로 이동</Stylespan>
          </Button>
        </Template>
        {/* <Button onClick={onTestFunc}> TEST </Button> */}
      </div>
    </>
  );
}

const Button = styled.button`
  /* 디자인 */
  background: #fa605a;
  &:hover {
    background: #b52038;
  }
  &:active {
    background: #b52038;
  }
  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  /* 크기 */
  width: 300px;
  height: 40px;

  /* 위치 */
  position: absolute;
  left: 25%; // 중앙으로 배치
  bottom: 10%; // 조금 위쪽으로
  /* transform: translate(-50%, -80%); */

  /* z-index: 5; */
  cursor: pointer;

  /* display: inline; */

  /* align-items: center; */
  /* justify-content: center; */

  transition: 0.125s all ease-in;
`;

const Stylespan = styled.span`
  color: white;
  font-size: 20px;
  font-family: NanumSquare_R;
  white-space: nowrap;
`;

const Styleh1 = styled.h1`
  /* margin: 0; */
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 45px;
  text-align: center;
  font-family: 'BwSurco';
  color: #404040;
`;

export default ErrorPage;
