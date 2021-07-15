import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';

function App() {
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

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={SigninPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/" component={MainPage} />
          {/** 이거 홈페이지가 위쪽에 있으면 안먹음 ...; */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
