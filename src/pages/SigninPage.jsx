import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import Template from '../components/Template';


function SigninPage() {
  return (
    <div className="container">
      <Navigationbar></Navigationbar>
      <Template status="login">
      </Template>
    </div>
  );
}

export default SigninPage;
