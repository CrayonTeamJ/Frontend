/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import LoginBlock from '../components/LoginBlock';
import Footer from '../components/Footer';

function SigninPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div style={{ height: '6vh' }}>
        <Navigationbar />
      </div>
      <div style={{ height: '89vh' }}>
        <div
          className="top-container"
          style={{ backgroundColor: 'red', height: '51vh' }}
        >
          <LoginBlock />
        </div>
        <div style={{ backgroundColor: 'blue', height: '38vh' }}>
          <span>bottom continer</span>
        </div>
      </div>
      <div style={{ height: '5vh' }}>
        <Footer />
      </div>
    </div>
  );
}

export default SigninPage;
