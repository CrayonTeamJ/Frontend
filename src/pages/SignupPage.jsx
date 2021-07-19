/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import RegiBlock from '../components/RegiBlock';
import Footer from '../components/Footer';

function SignupPage() {
  return (
    <>
      <div className="top-container">
        <div className="template-container">
          <RegiBlock />
        </div>
      </div>
      <div className="bottom-container">
        <span>bottom continer</span>
      </div>
    </>
  );
}

export default SignupPage;
