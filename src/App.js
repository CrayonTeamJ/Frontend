import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';


function App() {
  return (
    <>
    <Router>
      <Switch>
        <MainPage path='/' component={MainPage}></MainPage>
        <SigninPage path="/login" component={SigninPage}></SigninPage>
        <SignupPage path='/register' component={SignupPage}></SignupPage>
      </Switch>
    </Router>
    </>
  );
}

export default App;
