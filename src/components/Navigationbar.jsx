/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/seaflag.svg';
import Navbtn from './Navbtn';
import styled from 'styled-components';

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

const Navigationbar = () => {
  const [IsLogin, setIsLogin] = useState();

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
  //   return (
  //     <div className="navbar">
  //       <div className="nav_inner">
  //         <Link to="/" style={{ marginLeft: '20px' }}>
  //           <img src={logo} width="200" alt="logo" />
  //         </Link>
  //         <ul className="nav_user_box">
  //           <Link to="/login" className="btn_log">
  //             <StyleSpan>LOGIN STATUS</StyleSpan>
  //           </Link>
  //           <Link to="/signup" className="btn_res">
  //             <StyleSpan>LOGOUT</StyleSpan>
  //           </Link>
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="navbar">
      <div className="nav_inner">
        <Link to="/" style={{ marginLeft: '20px' }}>
          <img src={logo} width="200" alt="logo" />
        </Link>
        <ul className="nav_user_box">
          {/* <Link to="/login" className="btn_log">
            <StyleSpan>Log in</StyleSpan>
          </Link>
          <Link to="/signup" className="btn_res">
            <StyleSpan>Register</StyleSpan>
          </Link> */}
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

export default Navigationbar;
