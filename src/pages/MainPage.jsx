/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import imgback from '../img/backimg.png';
import Navbtn from '../components/Navbtn';
import Container from '../components/Container';
import Footer from '../components/Footer';

function MainPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div style={{ height: '6vh' }}>
        <Navigationbar />
      </div>
      <div style={{ height: '89vh' }}>
        <Container />
      </div>
      <div style={{ height: '5vh' }}>
        <Footer />
      </div>
    </div>
  );
}

export default MainPage;
