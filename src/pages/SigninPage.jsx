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
      <div className="top-container">
        <div className="template-container">
          <LoginBlock />
        </div>
      </div>
      <div className="bottom-container">
        <span>bottom continer</span>
      </div>
    </>
  );
}

export default SigninPage;
