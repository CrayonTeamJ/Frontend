/* eslint-disable no-undef */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/button-has-type */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useRef } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import audio from '../img/conversation.png';
import image from '../img/speech.png';
import both from '../img/video-player.png';

function ResultPage() {
  const location = useLocation();
  const [time, setTime] = React.useState('');

  //   const query = queryString.parse(location.search);
  //   const video_id = query.id;
  //   const type = query.searchtype;
  //   const search_aud = query.searchaud;
  //   const search_img = query.searchimg;
  const { res } = location.state;
  const results = res.result;
  const video_infos = res.video_info;
  const search_infos = res.search_info;
  const res_infos = res.res_info;

  //   ref = (player) => {
  //     this.player = player;
  //   };

  // 총길이
  const hour = parseInt(video_infos.length / 3600);
  const min = parseInt(video_infos.length / 60);
  const sec = parseInt(video_infos.length % 60);

  // 타임 스탬프 예쁘게 보여주기 위한 함수
  const seconds2time = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - hours * 3600) / 60);
    const second = seconds - hours * 3600 - minutes * 60;
    let timestamp = '';

    if (hours !== 0) {
      timestamp = `${hours}:`;
    }
    if (minutes !== 0 || seconds !== '') {
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

  // ref로 특정DOM선택(플레이어)
  const player = useRef(null);

  return (
    <>
      <div className="video-container">
        <div className="video-grid-item" style={{ paddingTop: '30px' }}>
          <ReactPlayer
            ref={player}
            url={video_infos.url}
            controls="true"
            pip="true"
            width="960px"
            height="540px"
          />
        </div>
        <div className="video-grid-item">
          <label
            style={{
              width: '960px',
              fontFamily: 'NanumSquare_R',
              fontSize: '25px',
            }}
          >
            {video_infos.title}
          </label>
        </div>
      </div>
      {/* <div className="result-container">
        <div className="header">head</div>
        <div className="button">but</div>
        <div className="results">res</div>
        <div className="button">but</div>
        <div className="footer">foot</div>
      </div> */}
      <div className="grid-container">
        <div className="grid-item header">
          <div className="header-item">
            <LogoLabel src={image} alt="logoimg" />
            <span> {search_infos.search_vid} 등장 </span>
          </div>
          <div className="header-item">
            <span> slider </span>
          </div>
        </div>
        <div className="grid-item aside">aside</div>
        <div className="grid-item content">
          {res_infos.map((result) => (
            <div className="content-item">
              <button
                className="content-item-inner"
                onClick={() => {
                  player.current.seekTo(result.start);
                }}
              >
                <ThumImg src={result.thumnail} alt="thumnail" width="280px" />
              </button>
              <div className="content-item-inner">
                <span
                  style={{
                    fontFamily: 'NanumSquare_L',
                    fontSize: '20px',
                    // textAlign: 'left',
                    marginLeft: '20px',
                    transform: 'translate(-100%, 0%)',
                  }}
                >
                  {seconds2time(result.start)} - {seconds2time(result.end)}
                </span>
              </div>
            </div>
            //   <div className="content-item">100</div>
            //   <div className="content-item">100</div>
            //   <div className="content-item">100</div>
            //   <div className="content-item">100</div>
            //   <div className="content-item">100</div>
          ))}
        </div>
        <div className="grid-item aside2">aside</div>
        <div className="grid-item footer">
          총 {hour}시간 {min}분 {sec}초
        </div>
      </div>
    </>
  );
}

const LogoLabel = styled.img`
  border-radius: 100px;
  display: inline-block;
  background-color: #fa605a;
  height: 50px;
  /* width: 4.5vw; */
`;

const ThumImg = styled.img`
  /* border-radius: 100px; */
  /* display: inline-block; */
  background-color: darkcyan;
  /* height: 50px; */
  /* width: 4.5vw; */
`;

export default ResultPage;
