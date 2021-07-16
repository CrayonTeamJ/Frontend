/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/seaflag.svg';
import profile from '../img/profile.png';
import Navbtn from './Navbtn';
import styled from 'styled-components';
import Timer from './Timer';
import { useSelector, useDispatch } from 'react-redux';
import { user_logout, user_refresh } from '../redux/users';
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

  // 로그아웃 버튼 함수
  const onLogoutHandler = () => {
    dispatch(user_logout())
      .then((res) => {
        console.log('logout?된건가?');
        if (res.payload.Result === 'success') {
          // accesskey를 제거해버림
          axios.defaults.headers.common.Authorization = ``;
          history.push('/login');
        } else {
          alert('로그아웃에 실패하였습니다');
          history.push('/home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // navbar가 모든 페이지에 있어서 사실 상관없긴 한데, 얘가 amount될 때마다 실행됨(근데 웨남ㄴ하면 app.js에 넣어야..)
  // amount시 마다 실행됨(타자 하나하나 칠때마다 amount) -> 근데 맨뒤에 ,[]이거 붙이면 update시 마다 실행됨(reload시만)
  // 인증키가 있는지 확인하는 (==로그인 되었는지, 인증회원인지)
  useEffect(() => {
    console.log('모든 페이지 리로드시 재발급 발생');
    console.log('new key');
    console.log(Key);
    dispatch(user_refresh())
      .then((res) => {
        if (res.payload.Result === 'success') {
          console.log('refresh성공');
          // accesskey재 등록
          axios.defaults.headers.common.Authorization = `Bearer ${Key}`;
        } else {
          console.log('refresh에 실패함');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log('컴포넌트가 화면에 나타남');

  //   axios
  //     .get('/api/input')
  //     .then((res) => {
  //       console.log('api/input의 결과');
  //       console.log(res);
  //       if (res.data.Result === 'Success') {
  //         console.log('회원이다.');
  //         // 맞으면 user_refresh해서 토큰도 새로갈고 시간도 초기화해줘야함
  //         // setIsLogin(true);
  //       } else {
  //         console.log('회원아니다.');
  //         // 아니면 .. 아닌거지뭐
  //         // setIsLogin(false);
  //       }
  //       // console.log('isLogin변수');
  //       // console.log(IsLogin);
  //     })
  //     .catch((err) => {
  //       console.log(err); // 로그인 안됐을 땐 401error 라서 아예 then이 실행이 안됨... 백엔드 단에서 인증회원아니어도 api접근은 되도록 바꿔야함
  //     });
  // });

  if (isLogin === true) {
    return (
      <div className="navbar">
        <div className="nav_inner">
          <Link to="/home" style={{ marginLeft: '20px' }}>
            <img src={logo} width="200" alt="logo" />
          </Link>
          <ul className="nav_user_box">
            <Timer />
            <StyleLabel>{Nickname}</StyleLabel>
            <Link to="/profile" style={{ marginLeft: '10px' }}>
              <ProfileImg src={Profile} width="200" alt="profile" />
            </Link>
            <Button onClick={onLogoutHandler}>
              <StyleSpan>LOGOUT</StyleSpan>
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
        <Link to="/home" style={{ marginLeft: '20px' }}>
          <img src={logo} width="200" alt="logo" />
        </Link>
        <ul className="nav_user_box">
          <Navbtn
            btntype="LOGIN"
            btnlink="/login"
            className="front_btn"
            color="#fa605a"
          />
          <Navbtn
            btntype="Register"
            btnlink="/signup"
            className="back_btn"
            color="white"
          />
        </ul>
      </div>
    </div>
  );
};

const StyleSpan = styled.span`
  position: absolute;
  font-family: NanumSquare_R;
  color: white;
  bottom: 25%;
  font-size: 12px;
  opacity: 1;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  white-space: nowrap;
`;

const ProfileImg = styled.img`
  border-radius: 100px;
  height: 45px;
  width: 45px;
`;

const StyleLabel = styled.label`
  font-family: NanumSquare_R;
  color: black;
  bottom: 25%;
  font-size: 15px;
  opacity: 1;
  white-space: nowrap;
  margin-left: 13px;
`;

const Button = styled.button`
  background: #fa605a;

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

  width: 95px;
  height: 30px;
  position: relative;
  margin-left: 10px;
  display: block;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;

  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

export default Navigationbar;
