/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import ReactPlayer from 'react-player';

function ResultPage() {
  const location = useLocation();

  //   const query = queryString.parse(location.search);
  //   const video_id = query.id;
  //   const type = query.searchtype;
  //   const search_aud = query.searchaud;
  //   const search_img = query.searchimg;
  const { res } = location.state;
  const results = res.result;
  const video_infos = res.video_info;

  //   console.log('result page');
  //   console.log(res);
  return (
    <>
      <div className="video-container">
        <div className="video-grid-item" style={{ paddingTop: '30px' }}>
          <ReactPlayer
            url="https://teamj-data.s3.ap-northeast-2.amazonaws.com/video/bts_colbert.mp4"
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
        <div className="grid-item header">header</div>
        <div className="grid-item aside">aside</div>
        <div className="grid-item content">
          <div className="content-item">100</div>
          <div className="content-item">100</div>
          <div className="content-item">100</div>
          <div className="content-item">100</div>
          <div className="content-item">100</div>
          <div className="content-item">100</div>
        </div>
        <div className="grid-item aside2">aside</div>
        <div className="grid-item footer">footer</div>
      </div>
    </>
  );
}

export default ResultPage;
