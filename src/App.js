import './App.css';
import React from 'react';
import Navigationbar from './components/Navigationbar';
import Template from './components/Template';
import { BrowserRouter as Router } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';


function App() {
  return (
    <Router>
      <MainPage></MainPage>
      <SigninPage></SigninPage>
      <SignupPage></SignupPage>
    </Router>
  );
}

export default App;
