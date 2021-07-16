/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Modal } from 'react-responsive-modal';
import { user_logout, user_refresh } from '../redux/users';
import 'react-responsive-modal/styles.css';

function Timer(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const Expire = useSelector((state) => state.users.access_expire, []);
  // const Expire = useSelector(stae)
  //   const [hour, setHour] = useState(1);
  //   const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const time = useRef(Expire / 1000); // expire time을 초로 주어야함 -> backend expire time이 milli second라서..나눠야함
  const timerId = useRef(null);
  const [open, setOpen] = useState(false);

  // 타임 스탬프 예쁘게 보여주기 위한 함수
  const seconds2time = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - hours * 3600) / 60);
    const second = seconds - hours * 3600 - minutes * 60;
    let timestamp = '';

    if (hours !== 0) {
      timestamp = `${hours}:`;
    }
    if (minutes !== 0 || time !== '') {
      minutes =
        minutes < 10 && timestamp !== '' ? `0${minutes}` : String(minutes);
      timestamp += `${minutes}:`;
    }
    if (timestamp === '') {
      timestamp = `${second}s`;
    } else {
      timestamp += second < 10 ? `0${second}` : String(second);
    }
    return timestamp;
  };

  // setInterval (1000=1초) 마다 실행
  useEffect(() => {
    timerId.current = setInterval(() => {
      //   setHour(parseInt(time.current / 3600)); // 몫만 보여주기 위해 parseInt사용
      //   setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1; // 1초 마다 전체 시간 감소시키기
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  const onCloseModal = (e) => {
    setOpen(false);

    dispatch(user_refresh())
      .then((res) => {
        if (res.payload.Result === 'success') {
          console.log('refresh성공');
          // accesskey재 등록
          console.log(res.payload.access_token);
          axios.defaults.headers.common.Authorization = `Bearer ${res.payload.access_token}`;
          history.replace('/');
        } else {
          console.log('refresh에 실패함');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // 만약 타임 아웃이 발생했을 경우
    if (time.current <= 30) {
      console.log('만료 시간 30초 남음 ');
      setOpen(true);
      // dispatch(user_refresh)
      // 모달창 띄우기 -> 확인버튼 누르면 dispatch(user_refresh)...
    }
    if (time.current <= -1) {
      // 00초로 보여주기 위해 -1로 설정
      console.log('타임 아웃');
      clearInterval(timerId.current);
      // 강제 로그아웃
      dispatch(user_logout())
        .then((res) => {
          console.log('logout?된건가?');
          if (res.payload.Result === 'success') {
            // accesskey를 제거해버림
            axios.defaults.headers.common.Authorization = ``;
            props.history.push('/login');
          } else {
            alert('로그아웃에 실패하였습니다');
          }
          props.history.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
      // 자동 로그아웃 해버리는 함수 dispatch(user_logout)
    }
  }, [sec]);

  return (
    <div>
      <Timerspan>{seconds2time(time.current)}</Timerspan>
      <Modal open={open} onClose={onCloseModal}>
        <h2>세션 만료 안내 </h2>
        <p>
          5분 뒤 세션이 자동으로 만료됩니다. 닫기를 누르면 세션이 자동으로
          재시작됩니다.
        </p>
      </Modal>
    </div>
  );
}

const Timerspan = styled.span`
  font-family: NanumSquare_R;
  color: #696969;
  bottom: 25%;
  font-size: 13px;
  opacity: 1;
  white-space: nowrap;
`;

export default Timer;
