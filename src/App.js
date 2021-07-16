/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import MyPage from './pages/MyPage';
import { user_refresh } from './redux/users';

function App() {
  const Key = useSelector((state) => state.users.access_token, []);
  const dispatch = useDispatch();
  // const api = axios.create({
  //   baseURL: 'http://localhost:5000'
  // })

  // const api = axios.create({
  //   httpsAgent: new https.Agent({   //지금 밑에 콘솔창에 뜬 에러는 이거임 https없어서
  //     rejectUnauthorized: false
  //   }),
  //   baseURL: 'https://localhost:5000'
  // })
  // api.get('https://localhost:5000/signup');

  // useEffect(() => {
  //   axios.get('http://localhost:5000/signup')      //endpoint. getRequest를 server 즉 index.js로 보내질 것
  //   .then(response => console.log())   //server 에서 돌아온 response를 콘솔창에 출력해봄
  // }, [])

  useEffect(() => {
    console.log('모든 페이지 리로드시 재발급 발생');
    console.log('new key');
    console.log(Key);
    dispatch(user_refresh())
      .then((res) => {
        console.log('refresh성공');
        if (res.payload.Result === 'success') {
          // accesskey재 등록
          axios.defaults.headers.common.Authorization = `Bearer ${Key}`;
        } else {
          console.log('refresh에 실패함');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
