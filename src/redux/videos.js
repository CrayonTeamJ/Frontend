/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// user login상태 관리

// action type
const VIDEO_INITID = 'videos/VIDEO_INITID ';

// action creator

// 1. USER_LOGIN
export const video_initID = (video_id) => {
  // const data = request('post', '/api/login', submitData);
  // console.log('login data from flask');
  console.log('video_intiID 함수내부출력 ');
  console.log(video_id);
  return {
    type: VIDEO_INITID,
    payload: video_id,
  };
};

// reducer
const initialState = {
  video_id: '',
};

// user 상태관리
const videos = (state = { initialState }, action) => {
  switch (action.type) {
    case VIDEO_INITID:
      return {
        ...state,
        video_id: action.payload,
      };
    default:
      return state;
  }
};

export default videos;
