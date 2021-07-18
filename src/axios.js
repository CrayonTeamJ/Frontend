/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const DOMAIN = 'http://localhost:5000';
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request = (method, url, data) =>
  axios({
    method,
    url: DOMAIN + url,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
