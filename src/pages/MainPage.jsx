import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';


function MainPage() {
  return (
    <div className="container">
      <Navigationbar></Navigationbar>
      <h1>THIS IS MAIN PAGE</h1>
    </div>
  );
}

export default MainPage;
