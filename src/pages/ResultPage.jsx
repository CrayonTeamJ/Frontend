/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
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
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom';
import img from '../img/loupe.png';
import both from '../img/video-player.png';

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
  const search_infos = res.search_info;
  const res_infos = res.res_info;

  // console.log(max);
  const { length } = res_infos;

  const map1 = res_infos.map((x) => x.leng);
  // console.log(map1);
  const max = Math.max(...map1);

  // 슬라이더바 값2개
  const [value, setValue] = React.useState([2, max]);

  // 범위를 기준으로 거르기
  const after_range_result = res_infos
    .filter((element) => element.leng <= value[1])
    .filter((element) => element.leng >= value[0]);

  //   console.log(new_result);
  //   ref = (player) => {
  //     this.player = player;
  //   };

  // 총길이
  const hour = parseInt(video_infos.length / 3600);
  const min = parseInt(video_infos.length / 60);
  const sec = parseInt(video_infos.length % 60);
  //   // 여기부분을 함수로만들어서 await해봐야하나
  //   if (search_infos.type === 'image') {
  //     // `${search_infos.serach_vid} 등장 검색 결과`
  //     setTxt(`${search_infos.serach_vid} 등장 검색 결과`);
  //     setImg(image);
  //   } else if (search_infos.type === 'audio') {
  //     setTxt(`${search_infos.serach_aud} 대사 검색 결과`);
  //     setImg(audio);
  //   } else if (search_infos.type === 'both') {
  //     setImg(both);
  //     setTxt(
  //       `${search_infos.serach_vid} 등장 과 ${search_infos.serach_aud} 대사 검색 결과`,
  //     );
  //   }

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

  // 슬라이더 조절
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  // console.log(video_infos.s3_url);
  // ref로 특정DOM선택(플레이어)
  const player = useRef(null);

  if (results === 'success') {
    return (
      <>
        <div className="video-container">
          <div className="video-grid-item" style={{ paddingTop: '100px' }}>
            <ReactPlayer
              ref={player}
              url={video_infos.s3_url}
              controls="true"
              pip="true"
              width="960px"
              height="540px"
            />
            {/* <h1>{video_infos.title}</h1> */}
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

        <div className="grid-container">
          <div className="grid-item header">
            <div className="header-item">
              {search_infos.type === 'both' ? (
                <>
                  <LogoLabel src={both} alt="logoimg" />
                  <span
                    style={{
                      fontFamily: 'NanumSquare_B',
                      fontSize: '18px',
                      marginLeft: '20px',
                    }}
                  >
                    "{search_infos.search_vid}" 과 "{search_infos.search_aud}"
                    검색 결과
                  </span>
                </>
              ) : (
                <>
                  <LogoLabel src={img} alt="logoimg" />
                  <span
                    style={{
                      fontFamily: 'NanumSquare_B',
                      fontSize: '18px',
                      marginLeft: '20px',
                    }}
                  >
                    "{search_infos.search_vid}
                    {search_infos.search_aud}" 검색 결과 ({length})
                  </span>
                </>
              )}
            </div>
            <div
              className="header-item"
              style={{
                display: 'flex',
                /* y축기준 중앙 */
                alignItems: 'center',
                /* y축 기준 내부에 요소들 끝으로 붙이기 */
                justifyContent: 'flex-end',
              }}
            >
              {search_infos.type === 'video' ? (
                <>
                  <span
                    style={{ fontFamily: 'NanumSquare_B', fontSize: '18px' }}
                  >
                    범위 :
                  </span>
                  <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(x) => seconds2time(x)}
                    aria-labelledby="range-slider"
                    min={2}
                    max={max + 1}
                    color="secondary"
                    style={{ marginLeft: '20px', width: '200px' }}
                    //   getAriaValueText={valuetext}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid-item aside">aside</div>
          <div className="grid-item content" style={{ overflow: 'scroll' }}>
            {after_range_result.map((result) => (
              <div className="content-item">
                <button
                  className="content-item-inner"
                  onClick={() => {
                    player.current.seekTo(result.start);
                  }}
                  style={{ border: 'none' }}
                >
                  <ThumImg
                    src={result.thumbnail}
                    alt="thumbnail"
                    width="280px"
                  />
                </button>
                <div className="content-item-inner">
                  {search_infos.type === 'video' ? (
                    <span
                      style={{
                        fontFamily: 'NanumSquare_L',
                        fontSize: '20px',
                        // textAlign: 'left',
                        marginLeft: '10px',
                        transform: 'translate(-100%, 0%)',
                      }}
                    >
                      {seconds2time(result.start)} - {seconds2time(result.end)}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontFamily: 'NanumSquare_L',
                        fontSize: '20px',
                        display: 'flex',
                        textAlign: 'left',
                        marginLeft: '10px',
                        //   transform: 'translate(-100%, 0%)',
                      }}
                    >
                      {seconds2time(result.start)}
                    </span>
                  )}
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
            {search_infos.type === 'video' ? (
              <>
                <span
                  style={{
                    fontFamily: 'NanumSquare_B',
                    fontSize: '18px',
                    color: 'black',
                  }}
                >
                  총 {hour}시간 {min}분 {sec}초
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="comment-container">
          <div className="comment-grid-item">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button>
                <Stylespan>시작 페이지로</Stylespan>
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
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

const Button = styled.button`
  /* 디자인 */
  background: #fa605a;
  &:hover {
    background: #b52038;
  }
  &:active {
    background: #b52038;
  }
  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  /* 크기 */
  width: 25vw;
  height: 5vh;

  /* z-index: 5; */
  cursor: pointer;

  /* display: inline; */

  /* align-items: center; */
  /* justify-content: center; */

  /* transition: 0.125s all ease-in; */
`;

const Stylespan = styled.span`
  color: white;
  font-size: 1.7vw;
  font-family: NanumSquare_R;
  white-space: nowrap;
`;

export default ResultPage;
