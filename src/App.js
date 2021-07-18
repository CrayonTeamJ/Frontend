/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import MyPage from './pages/MyPage';
import PrivateRoute from './components/PrivateRoute';
import MemberOnlyPage from './pages/MemberOnlyPage';
import UploadPage from './pages/UploadPage';
import Navigationbar from './components/Navigationbar';

function App() {
  // const isLogin = useSelector((state) => state.isLogin, []);
  // const dispatch = useDispatch();

  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Router>
          <div style={{ height: '6vh', width: '100vw' }}>
            <Navigationbar />
          </div>
          <Switch>
            <Route path="/home" component={MainPage} />
            <Route path="/login" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/memberonly" component={MemberOnlyPage} />
            <Route path="/upload" component={UploadPage} />
            <PrivateRoute path="/profile" component={MyPage} />
            <Route path="/" component={MainPage} />

            {/** 이거 홈페이지가 위쪽에 있으면 안먹음 ...; */}
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
