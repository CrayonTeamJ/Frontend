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
import SearchPage from './pages/SearchPage';
import Footer from './components/Footer';

function App() {
  // const isLogin = useSelector((state) => state.isLogin, []);
  // const dispatch = useDispatch();

  return (
    <>
      <div className="new-container">
        <Router>
          <div className="nav-container">
            <Navigationbar />
          </div>
          <div className="main-container">
            <Switch>
              <Route path="/login" component={SigninPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/memberonly" component={MemberOnlyPage} />
              <Route path="/search" component={MainPage} />
              <Route path="/" component={UploadPage} />
              {/* <Route path="/search" component={SearchPage} />
              <Route path="/profile" component={MyPage} /> */}
            </Switch>
          </div>
          <div className="footer-container">
            <Footer />
          </div>
          {/** 이거 홈페이지가 위쪽에 있으면 안먹음 ...; */}
        </Router>
      </div>
    </>
  );
}

export default App;
