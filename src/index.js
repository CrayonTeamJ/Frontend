/* eslint-disable import/order */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import rootReducer from './redux';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import promiseMiddlerware from 'redux-promise';
import reduxThunk from 'redux-thunk';

// import * as serviceWorker from './serviceWorker';

// refresh Token cookie 을 주고받기 위한 설정
axios.defaults.withCredentials = true;

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk,
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWidthMiddleware(
        rootReducer,
        // 개발자 도구를 사용하기 위한 설정
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
// serviceWorker.unregister();
