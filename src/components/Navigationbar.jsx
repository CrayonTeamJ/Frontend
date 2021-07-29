/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/seaflag.svg';
import styled from 'styled-components';
import Timer from './Timer';
import { useSelector, useDispatch } from 'react-redux';
import { user_logout } from '../redux/users';
import { useHistory } from 'react-router';

const Navigationbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Key = useSelector((state) => state.users.access_token, []);

  // store에 접근해서 변수가져오기
  const Nickname = useSelector((state) => state.users.Nickname, []);
  const Profile = useSelector((state) => state.users.Profile, []);
  const Expire = useSelector((state) => state.users.access_expire, []);
  const isLogin = useSelector((state) => state.users.isLogin, []);

  // console.log('로그인상태');
  // console.log(isLogin);

  // 로그아웃 버튼 함수
  const onLogoutHandler = () => {
    dispatch(user_logout())
      .then((res) => {
        if (res.payload.Result === 'success') {
          // accesskey를 제거해버림
          axios.defaults.headers.common.Authorization = ``;
          history.push('/login');
        } else {
          alert('로그아웃에 실패하였습니다');
          history.push('/');
        }
      })
      .catch((err) => {
        // console.log(err);
        history.push('/error?errtype=logout');
      });
  };

  // 로그인 된 경우에는 회원 정보
  if (isLogin === true) {
    return (
      <div className="navbar">
        <div className="nav_inner">
          <Link to="/" style={{ marginLeft: '10px', width: '50vw' }}>
            <img src={logo} width="200px" alt="logo" />
          </Link>
          <ul className="nav_user_box">
            <ProfileImg src={Profile} alt="profile" />
            <StyleLabel>{Nickname}</StyleLabel>
            <Timer style={{ width: '15px' }} />
            <Button color="#fa605a" onClick={onLogoutHandler}>
              <StyleSpan color="white">LOGOUT</StyleSpan>
            </Button>
          </ul>
        </div>
      </div>
    );
  }

  // 로그인 이전
  return (
    <div className="navbar">
      <div className="nav_inner">
        <Link to="/" style={{ marginLeft: '10px' }}>
          <img src={logo} width="200px" alt="logo" />
        </Link>
        <ul className="nav_user_box">
          <Link to="/login" color="white">
            <Button>
              <StyleSpan color="#fa605a">LOGIN</StyleSpan>
            </Button>
          </Link>
          <Link to="/signup">
            <Button color="#fa605a">
              <StyleSpan color="white">Register</StyleSpan>
            </Button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

const StyleSpan = styled.span`
  position: absolute;
  font-family: NanumSquare_R;
  color: ${(props) => props.color};
  /* bottom: 25%; */
  font-size: 15px;
  opacity: 1;
  /* -webkit-transform: translateX(-50%); */
  /* transform: translateX(-50%); */
  white-space: nowrap;
`;

const ProfileImg = styled.img`
  border-radius: 100px;
  height: 45px;
  margin-left: 10px;
  /* width: 4.5vw; */
`;

const StyleLabel = styled.label`
  font-family: NanumSquare_B;
  color: #000000;
  bottom: 25%;
  font-size: 18px;
  opacity: 1;
  white-space: nowrap;
  margin-left: 13px;
  margin-right: 13px;
`;

const Button = styled.button`
  background: ${(props) => props.color};

  z-index: 5;
  cursor: pointer;

  display: block;
  font-size: 20px;

  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 170px;
  height: 35px;
  position: relative;
  margin-left: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;

  border: 1px solid #fa605a;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

export default Navigationbar;
