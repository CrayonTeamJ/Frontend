/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Navigationbar from '../components/Navigationbar';
import LoginBlock from '../components/LoginBlock';
import Footer from '../components/Footer';

function SigninPage() {
  return (
    <>
      <div style={{ height: '89vh', width: '100vw' }}>
        <div
          className="top-container"
          style={{ backgroundColor: 'red', height: '51vh', width: '100vw' }}
        >
          <LoginBlock />
        </div>
        <div
          style={{ backgroundColor: 'blue', height: '38vh', width: '100vw' }}
        >
          <span>bottom continer</span>
        </div>
      </div>
      <div style={{ height: '5vh', width: '100vw' }}>
        <Footer />
      </div>
    </>
  );
}

export default SigninPage;
