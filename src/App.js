/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import MyPage from './pages/MyPage';

function App() {
  const Key = useSelector((state) => state.users.access_token, []);
  const dispatch = useDispatch();

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/home">
            <MainPage />
          </Route>
          <Route path="/login" component={SigninPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/profile" component={MyPage} />
          <Route path="/" component={MainPage} />
          {/** 이거 홈페이지가 위쪽에 있으면 안먹음 ...; */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
