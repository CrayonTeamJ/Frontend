/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// user login상태 관리

import { request } from '../axios';

// action type
const USER_LOGIN = 'users/USER_LOGIN';
const USER_REFRESH = 'user/USER_REFRESH';
const USER_LOGOUT = 'users/USER_LOGOUT';

// action creator

// 1. USER_LOGIN
export const user_login = (submitData) => {
  const data = request('post', '/api/login', submitData);
  console.log('login data from flask');
  console.log(data);
  return {
    type: USER_LOGIN,
    payload: data,
  };
};

// 2. USER_REFRESH
export const user_refresh = () => {
  const data = request('get', '/api/refresh');
  console.log('refresh from flask');
  console.log(data);
  return {
    type: USER_LOGIN,
    payload: data,
  };
};

// reducer
const initialState = {
  Result: '',
  access_expire: '',
  access_token: '',
  isLogin: '',
};

// user 상태관리
const users = (state = { initialState }, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        Result: action.payload.Result,
        access_expire: action.payload.access_expire,
        isLogin: action.payload.isLogin,
        access_token: action.payload.access_token,
      };
    case USER_REFRESH:
      return {
        ...state,
        access_expire: action.payload.access_expire,
        isLogin: action.payload.isLogin,
        access_token: action.payload.access_token,
      };
    default:
      return state;
  }
};

export default users;
