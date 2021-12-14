/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
// import rootReducer from './redux';
// import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
// import promiseMiddlerware from 'redux-promise';
// import reduxThunk from 'redux-thunk';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import users from './redux/users';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store';
// import Loader from 'react-loader-spinner';
// import { usePromiseTracker } from 'react-promise-tracker';
// import * as serviceWorker from './serviceWorker';

// refresh Token cookie 을 주고받기 위한 설정
axios.defaults.withCredentials = true;

// const createStoreWidthMiddleware = applyMiddleware(
//   promiseMiddlerware,
//   reduxThunk,
// )(createStore);

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const enhancedReducer = persistReducer(persistConfig, users);

// const store = createStoreWidthMiddleware(
//   rootReducer,
//   enhancedReducer,
//   // 개발자 도구를 사용하기 위한 설정
// );

const persistor = persistStore(store);

// const LoadingIndicator = (props) => {
//   const { promiseInProgress } = usePromiseTracker({ area: props.area });

//   return (
//     promiseInProgress && (
//       <div
//         className="new-container"
//         style={{
//           width: '100%',
//           height: '100',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           zIndex: '10',
//         }}
//       >
//         <Loader type="ThreeDots" color="#fa506a" height="100" width="100" />
//       </div>
//     )
//   );
// };

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
