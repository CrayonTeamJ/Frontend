import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import Template from '../components/Template';


function SignupPage() {
  return (
    <div className="container">
      <Navigationbar></Navigationbar>
      <Template status="signup">
      </Template>
    </div>
  );
}

export default SignupPage;
