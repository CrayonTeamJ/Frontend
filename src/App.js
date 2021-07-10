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
        <Route path="/login" component={SigninPage}></Route >
        <Route  path='/register' component={SignupPage}></Route >
        <Route  path='/' component={MainPage}></Route >
      </Switch>
    </Router>
    </>
  );
}

export default App;
