/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// user login상태 관리

import { request_form } from '../axios';

// action type
const STATUS_SETID = 'status/STATUS_SETID';
// const STATUS_UNSETID = 'status/STATUS_UNSETID';

// action creator

// 1. USER_LOGIN
// 1. USER_LOGIN
export const status_getID = (submitData) => {
  const data = request_form('post', '/api/videoUpload', submitData);
  console.log('status 내부');
  console.log(data);
  return {
    type: STATUS_SETID,
    payload: data,
  };
};

// reducer
const initialState = {
  yolo_id: '',
  clova_id: '',
};

// user 상태관리
const status = (state = { initialState }, action) => {
  switch (action.type) {
    case STATUS_SETID:
      return {
        ...state,
        yolo_id: action.payload.yolo_id,
        clova_id: action.payload.clova_id,
      };
    // case STATUS_UNSETID:
    //   return {
    //     ...state,
    //     yolo_id: '',
    //     clova_id: '',
    //   };
    default:
      return state;
  }
};

export default status;
