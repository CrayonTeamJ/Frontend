import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import rootReducer from './redux';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
//import * as serviceWorker from './serviceWorker';


//refresh Token cookie 을 주고받기 위한 설정 
axios.defaults.withCredentials = true;

const store = createStore(rootReducer, composeWithDevTools()); //스토어 생성 : 최상위 컴포넌트(app.js)가 랜더링 되는 곳(index.js) -> why? 하위 컴포넌트들이 모두 여기에 접근가능해야함

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


reportWebVitals();
//serviceWorker.unregister();