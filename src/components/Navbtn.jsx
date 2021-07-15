import '../App.css';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 로그인, 로그아웃, 회원가입 버튼
const Navbtn = (props) => (
  <Link to={props.btnlink} className={props.className}>
    <StyleSpan style={{ color: props.color }}>{props.btntype}</StyleSpan>
  </Link>
);

const StyleSpan = styled.span`
  position: absolute;
  font-family: NanumSquare_R;
  bottom: 30%;
  font-size: 12px;
  opacity: 1;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  white-space: nowrap;
`;

export default Navbtn;
