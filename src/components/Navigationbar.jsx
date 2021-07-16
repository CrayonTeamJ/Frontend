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

const TimerLabel = styled.label`
  font-family: NanumSquare_R;
  color: #696969;
  bottom: 25%;
  font-size: 13px;
  opacity: 1;
  white-space: nowrap;
`;

const Navigationbar = () => {
  const [IsLogin, setIsLogin] = useState(false);
  const [Nickname, setNickname] = useState('Fekar13');
  const [Profile, setProfile] = useState('');
  const [Expire, setExpire] = useState(3);

  // 근데안되는듯...  페이지 리로드하면 최초 제외 undefine으로 출력됨
  // amount시 마다 실행됨(타자 하나하나 칠때마다 amount) -> 근데 맨뒤에 ,[]이거 붙이면 update시 마다 실행됨(reload시만)
  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');

    axios.get('/api/input').then((res) => {
      console.log(res);
      if (res.data.Result === 'Success') {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      console.log(IsLogin);
    });
  });

  // if (IsLogin === true) {
  return (
    <div className="navbar">
      <div className="nav_inner">
        <Link to="/" style={{ marginLeft: '20px' }}>
          <img src={logo} width="200" alt="logo" />
        </Link>
        <ul className="nav_user_box">
          <Timer duration={Expire} />
          <StyleLabel>{Nickname}</StyleLabel>
          <Link to="/profile" style={{ marginLeft: '10px' }}>
            <ProfileImg src={profile} width="200" alt="profile" />
          </Link>
          <Navbtn
            btntype="LOGOUT"
            btnlink="/logout"
            className="back_btn"
            color="white"
          />
        </ul>
      </div>
    </div>
  );
  // }

  // 로그인 이전
  // return (
  //   <div className="navbar">
  //     <div className="nav_inner">
  //       <Link to="/" style={{ marginLeft: '20px' }}>
  //         <img src={logo} width="200" alt="logo" />
  //       </Link>
  //       <ul className="nav_user_box">
  //         <Navbtn
  //           btntype="LOGIN"
  //           btnlink="/login"
  //           className="front_btn"
  //           color="#fa605a"
  //         />
  //         <Navbtn
  //           btntype="Register"
  //           btnlink="/signup"
  //           className="back_btn"
  //           color="white"
  //         />
  //       </ul>
  //     </div>
  //   </div>
  // );
};

export default Navigationbar;
