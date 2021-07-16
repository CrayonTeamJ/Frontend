/* eslint-disable camelcase */
/* eslint-disable import/named */
/* eslint-disable no-lonely-if */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { user_login, user_refresh } from '../redux/users';

function LoginBlock(props) {
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

  //   const onTestFunc = (e) => {
  //     e.preventDefault(); // refresh 방지

  //     const formbody = {
  //       userID: UserID,
  //       password: Password,
  //     };

  //     axios.get('/api/input').then((res) => {
  //       console.log(res);
  //     });
  //   };

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
        console.log('dispact login User res');
        console.log(res);
        if (res.payload.Result === 'success') {
          console.log('로그인성공');
          // onLoginSuccess(res);
          const accessToken = res.payload.access_token; // 이거
          axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          history.push('/home'); // 성공하면 메인화면으로 돌아감
        } else {
          // 비번이나 아이디 틀렸음
          if (res.payload.Result === 'fail') {
            console.log('비번이나 아이디 틀림');
            setErrtxt('아이디와 비밀번호를 확인해주세요');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const onSilentRefresh = () => {
  //     axios
  //       .get('/api/refresh')
  //       .then((res) => {
  //         console.log(res);
  //         console.log('정상적으로 refresh 완료');
  //         onLoginSuccess(res);
  //       })
  //       .catch((err) => {
  //         // Hide Loader
  //         console.error(err);
  //       });
  //   };

  // 이것도 정상적으로 작동하긴함 -> access token header에 default로 담기(인증유저가됨)
  const onLoginSuccess = (res) => {
    // access Token을 localStorage나 cookie에 저장하지 않음(보안상 문제 노션링크참조)

    const accessToken = res.payload.access_token; // 이거
    // const accessExpire = res.payload.access_expire;

    // console.log(accessExpire);
    // accessToken default로 설정
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // accessToken만료시 timeout되는데... 그거 refresh하는 함수만들어야하는데 아직 이따가..
    // setTimeout(dispatch(user_refresh()), `${accessExpire}` - 60000); 아직에러잇음
    // 만료일분 전에 로그인 연장
  };

  return (
    <div className="template-container">
      <TemplateBlock>
        <h1> SIGN IN </h1>
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
            LOGIN
          </Button>
        </InsertForm>
      </TemplateBlock>
      {/* <Button onClick={onTestFunc}> TEST </Button> */}
    </div>
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

  h1 {
    margin: 0;
    margin-top: 40px;
    margin-bottom: 35px;
    font-size: 30px;
    text-align: center;
    font-family: 'BwSurco';
    color: #404040;
  }
`;

const InsertForm = styled.form`
  padding-left: 50px;
  padding-top: 2%;
  padding-right: 50px;
  padding-bottom: 2%;

  Input {
    margin-bottom: 20px;
    margin-top: 20px;
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

const Button = styled.button`
  background: #fa605a;
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
  align-items: center;
  justify-content: center;
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

const Label = styled.label`
  padding: 5px;
  font-size: 12px;
  font-family: 'NanumSquare_R';
  color: #fa605a;
`;

export default LoginBlock;
