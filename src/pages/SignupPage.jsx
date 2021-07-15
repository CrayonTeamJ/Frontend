/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigationbar from '../components/Navigationbar';
import Template from '../components/Template';
import regsuccess from '../img/goal.png';

const TemplateBlock = styled.div`
  width: 512px;
  height: 400px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 120px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;

  opacity: 1;

  h1 {
    margin: 0;
    margin-top: 40px;
    margin-bottom: 5px;
    font-size: 30px;
    text-align: center;
    font-family: 'BwSurco';
    color: #404040;
  }

  img {
    padding-top: 30px;
    margin: 0 auto; /* 중앙정렬  */
  }

  label {
    font-size: 14px;
    font-family: 'NanumSquare_R';
    align-items: center;
    justify-content: center;
    text-align: center;
    transform: translate(0%, 100%); /* 버튼위치 */
  }
`;

const ResBlock = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  padding-top: -5px;
`;

const InsertForm = styled.form`
  padding-left: 50px;
  padding-top: 1%;
  padding-right: 50px;
  padding-bottom: 1%;

  Input {
    margin-bottom: 7px;
    margin-top: 7px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;

const Label = styled.label`
  padding: 5px;
  font-size: 12px;
  font-family: 'NanumSquare_R';
  color: #fa605a;
`;

const Button = styled.button`
  background: #85bcbe;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 200px;
  height: 35px;
  display: block;
  font-size: 20px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, -100%); /* 버튼위치 */
  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

const Linkbtn = styled.link`
  background: #85bcbe;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 200px;
  height: 35px;
  display: block;
  font-size: 20px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, -100%); /* 버튼위치 */
  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

const Stylespan = styled.span`
  color: white;
  font-size: 20px;
  font-family: NanumSquare_R;
  white-space: nowrap;
`;

function SignupPage(props) {
  // 회원가입 후 로그인창으로 가게 해보려고..

  const [Nickname, setNickname] = React.useState('');
  const [UserID, setUserID] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [Password_veri, setPassword_veri] = React.useState('');
  const [Errtxt, setErrtxt] = React.useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };
  const onChangeID = (e) => {
    setUserID(e.target.value);
  };
  const onChangePW = (e) => {
    setPassword(e.target.value);
  };
  const onChangePW_V = (e) => {
    setPassword_veri(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault(); // refresh 방지
    setErrtxt('');

    // 입력 안했을 때
    if (!Nickname) {
      setErrtxt('닉네임을 입력해주세요');
      return; // 오류나면 더 진행하지(서버로안감) 않고 끊어야해서 리턴임
    }
    if (!UserID) {
      setErrtxt('ID를 입력해주세요');
      return;
    }
    if (!Password) {
      setErrtxt('비밀번호를 입력해주세요');
      return;
    }
    if (!Password_veri) {
      setErrtxt('비밀번호 확인이 필요합니다!');
      return;
    }

    // 비밀번호 제한사항
    if (Password.length < 8 || Password.length > 12) {
      setErrtxt('비밀번호는 8자이상 12자이하여야 합니다');
      return;
    }
    // 비밀번호!= 확인용비밀번호
    if (Password !== Password_veri) {
      setErrtxt('비밀번호가 일치하지 않습니다');
      return;
    }

    const formbody = {
      nickname: Nickname,
      userID: UserID,
      password: Password,
      password2: Password_veri,
    };

    axios
      .post('/api/signup', formbody, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.Result === 'Success') {
          // signup 오류
          console.log('성공');
          setIsRegistraionSuccess(true);
        } else {
          // signup 오류
          console.log('실패');

          // 닉네임 중복
          if (res.data.Result === 'NK_duplicated') {
            console.log('닉네임중복');
            setErrtxt('이미 존재하는 닉네임입니다');
          }

          // 아이디 중복
          if (res.data.Result === 'ID_duplicated') {
            console.log('아이디 중복');
            setErrtxt('이미 존재하는 아이디입니다');
          }
        }
      })
      .catch((err) => {
        // Hide Loader
        console.error(err);
      });
  };

  if (isRegistraionSuccess) {
    return (
      <div className="container">
        <Navigationbar />
        <TemplateBlock>
          <h1> WELCOME TO SEAFLAG </h1>
          <img src={regsuccess} width="150" alt="succ_img" />
          <label style={{ fontFamily: 'NanumSquare_B' }}>
            WE are glad you are with us!
          </label>
          <Button>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Stylespan>LOGIN</Stylespan>
            </Link>
          </Button>
        </TemplateBlock>
      </div>
    );
  }

  return (
    <div className="container">
      <Navigationbar />
      <TemplateBlock>
        <h1> SIGN UP </h1>
        <InsertForm onSubmit={onSubmitHandler}>
          <Input
            placeholder="Nickname"
            value={Nickname}
            onChange={onChangeNick}
          />
          <Input placeholder="ID" value={UserID} onChange={onChangeID} />
          <Input
            type="password"
            placeholder="Create password"
            value={Password}
            onChange={onChangePW}
          />
          <Input
            type="password"
            placeholder="Verify password"
            value={Password_veri}
            autoFocus
            onChange={onChangePW_V}
          />
          <Label>{Errtxt}</Label>
          <Button onClick={onSubmitHandler}> Register </Button>
        </InsertForm>
      </TemplateBlock>
    </div>
  );
}

export default SignupPage;
