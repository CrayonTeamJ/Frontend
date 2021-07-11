import React from "react";
import logo from '../img/seaflag.svg';
import styled from "styled-components";
import { Link } from 'react-router-dom';




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
  return (
    <div className="navbar">
      <div className="nav_inner">
          <Link to="/" style={{marginLeft:"20px"}}>
            <img src={logo} width="200" alt="logo"/>
          </Link>
          <ul className="nav_user_box">
          <Link to="/login" className="btn_log">
            <StyleSpan>Log in</StyleSpan>
          </Link>
          <Link to="/signup" className="btn_res">
            <StyleSpan>Register</StyleSpan>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navigationbar;