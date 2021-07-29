/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux';
import App from './App';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store';

// refresh Token cookie 을 주고받기 위한 설정
axios.defaults.withCredentials = true;

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
        {/* <LoadingIndicator /> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
// serviceWorker.unregister();
