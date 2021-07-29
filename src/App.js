/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import PrivateRoute from './components/PrivateRoute';
import MemberOnlyPage from './pages/MemberOnlyPage';
import UploadPage from './pages/UploadPage';
import Navigationbar from './components/Navigationbar';
import SearchPage from './pages/SearchPage';
import Footer from './components/Footer';
import ResultPage from './pages/ResultPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <div className="new-container">
        <Router>
          <div className="nav-container">
            <Navigationbar />
          </div>
          <Switch>
            <Route path="/login" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/memberonly" component={MemberOnlyPage} />
            <PrivateRoute path="/search" component={SearchPage} />
            <PrivateRoute path="/result" component={ResultPage} />
            <Route path="/error" component={ErrorPage} />
            <Route path="/" component={UploadPage} />
          </Switch>

          <div className="footer-container">
            <Footer />
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
