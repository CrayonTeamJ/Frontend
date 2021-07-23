/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';

import Template from '../components/Template';
import { user_login } from '../redux/users';

function SigninPage() {
  const [UserID, setUserID] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [Errtxt, setErrtxt] = React.useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // id입력
  const onChangeID = (e) => {
    setUserID(e.target.value);
  };

  // pw입력
  const onChangePW = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = (e) => {
    e.preventDefault(); // refresh 방지
    setErrtxt('');

    if (!UserID) {
      setErrtxt('ID를 입력해주세요');
      return;
    }
    if (!Password) {
      setErrtxt('비밀번호를 입력해주세요');
      return;
    }

    const formbody = {
      userID: UserID,
      password: Password,
    };

    dispatch(user_login(formbody))
      .then((res) => {
        if (res.payload.Result === 'success') {
          const accessToken = res.payload.access_token;
          axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          history.push('/');
        } else {
          // 비번이나 아이디 틀렸음
          if (res.payload.Result === 'fail') {
            setErrtxt('아이디와 비밀번호를 확인해주세요');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 이것도 정상적으로 작동하긴함 -> access token header에 default로 담기(인증유저가됨)
  const onLoginSuccess = (res) => {
    const accessToken = res.payload.access_token;
    // accessToken default로 설정
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  return (
    <>
      <div className="top-container">
        <Template>
          <Styleh1> SIGN IN </Styleh1>
          <InsertForm style={{ marginBottom: '15px' }}>
            <Input
              value={UserID}
              autoFocus
              placeholder="ID"
              onChange={onChangeID}
            />
            <Input
              value={Password}
              autoFocus
              placeholder="Password"
              onChange={onChangePW}
            />
            <Label>{Errtxt}</Label>
            <Button style={{ marginTop: '50px' }} onClick={onLogin}>
              <Stylespan>LOGIN</Stylespan>
            </Button>
          </InsertForm>
        </Template>
        {/* <LoginBlock /> */}
      </div>
      <div className="bottom-container">
        <span>bottom continer</span>
      </div>
    </>
  );
}

const TemplateBlock = styled.div`
  width: 512px;
  height: 400px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  display: flex;
  flex-direction: column;

  opacity: 1;
`;

const InsertForm = styled.form`
  padding-left: 50px;
  padding-top: 2%;
  padding-right: 50px;
  padding-bottom: 2%;

  text-align: center;
  Input {
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #dee2e6;
  width: 80%;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;

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
  width: 25vw;
  height: 5vh;

  /* 위치 */
  position: absolute;
  left: 25%; /* 중앙으로 배치 */
  bottom: 10%; /* 조금 위쪽으로 */
  /* transform: translate(-50%, -80%); */

  /* z-index: 5; */
  cursor: pointer;

  /* display: inline; */

  /* align-items: center; */
  /* justify-content: center; */

  transition: 0.125s all ease-in;
`;

const Label = styled.label`
  padding: 5px;
  font-size: 1.2vw;
  font-family: 'NanumSquare_R';
  color: #fa605a;
`;

const Styleh1 = styled.h1`
  /* margin: 0; */
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 4.5vh;
  text-align: center;
  font-family: 'BwSurco';
  color: #404040;
`;

const Stylespan = styled.span`
  color: white;
  font-size: 1.7vw;
  font-family: NanumSquare_R;
  white-space: nowrap;
`;
export default SigninPage;
