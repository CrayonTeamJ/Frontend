/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import '../App.css';
import styled from 'styled-components';

const Template = ({ children }) => (
  <div className="template-wrapper">{children}</div>
);

export default Template;

// const TemplateBlock = styled.div`
//   /* 크기 */
//   width: 50vw;
//   height: 60vh;

//   /* 위치-> 부모 relative */
//   position: absolute; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
//   /* margin: 0 auto; 페이지 중앙에 나타나도록 설정 */

//   /* margin-top: 2.5vh; */
//   /* margin-bottom: 2.5vh; */
//   display: inline-block;
//   flex-direction: column;

//   /* 디자인 */
//   background: white;
//   border-radius: 16px;
//   box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
//   opacity: 1;

//   h1 {
//     margin: 0;
//     margin-top: 40px;
//     margin-bottom: 35px;
//     font-size: 30px;
//     text-align: center;
//     font-family: 'BwSurco';
//     color: #404040;
//   }
// `;

const Label = styled.h1`
  margin: 0;
  margin-top: 40px;
  margin-bottom: 35px;
  font-size: 30px;
  text-align: center;
  font-family: 'BwSurco';
  color: #404040;
`;
