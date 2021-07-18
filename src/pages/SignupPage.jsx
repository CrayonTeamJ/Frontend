/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import RegiBlock from '../components/RegiBlock';
import Footer from '../components/Footer';

function SignupPage() {
  return (
    <>
      <div style={{ height: '89vh', width: '100vw' }}>
        <div
          className="top-container"
          style={{ backgroundColor: 'red', height: '51vh', width: '100vw' }}
        >
          <span>top container</span>
          <RegiBlock />
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

export default SignupPage;
