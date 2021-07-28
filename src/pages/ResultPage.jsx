/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-const-assign */
/* eslint-disable no-restricted-globals */
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
import { useLocation } from 'react-router';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img from '../img/loupe.png';
import both from '../img/video-player.png';
import noResult from '../img/not-found.png';

function ResultPage() {
  const location = useLocation();

  // 서버에서 받아온 결과
  const { res } = location.state;
  const results = res.result;
  const video_infos = res.video_info;
  const search_infos = res.search_info;
  const res_infos = res.res_info;

  // console.log(res);
  // 댓글관련 변수
  const Nickname = useSelector((state) => state.users.Nickname, []);
  const Profile = useSelector((state) => state.users.Profile, []);

  // 필요한 변수들

  // 결과 수
  const { length } = res_infos;

  // 최장 등장 길이 계산을 위한
  const map1 = res_infos.map((x) => x.leng);
  const max = Math.max(...map1);

  // 슬라이더바 값2개
  const [value, setValue] = React.useState([2, max]);

  // if (search_infos.type === 'video') {
  //   setValue([2, max]);
  // } else {
  //   setValue([0, 999999]);
  // }

  // 슬라이더의 범위를 기준으로 결과를 거르기
  const after_range_result = res_infos
    .filter((element) => element.leng <= value[1])
    .filter((element) => element.leng >= value[0]);

  // 총 길이 출력을 위한
  const hour = parseInt(video_infos.length / 3600);
  const min = parseInt(video_infos.length / 60);
  const sec = parseInt(video_infos.length % 60);

  // sec을 받아서 timestamp를 반환하는 함수
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

  // 슬라이더 조절을 위한 함수
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  // 댓글생성을 위한 list
  const time_list = res_infos.map((element) => seconds2time(element.start));

  // 댓글 생성
  let comment = '';
  time_list.forEach(
    (element) =>
      (comment += `${element}  ${search_infos.search_vid} ${search_infos.search_aud} 등장, 언급 부분 \n`),
  );

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
              controls
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
                    검색 결과 ({length})
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
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {search_infos.type === 'video' && isFinite(max) ? (
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
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid-item aside">aside</div>
          {length === 0 ? (
            <div
              className="grid-item content-no-result"
              style={{ overflow: 'scroll' }}
            >
              <div className="content-no-item">
                <img
                  src={noResult}
                  style={{
                    width: '180px',
                    height: '180px',
                    marginTop: '80px',
                  }}
                  alt="img"
                />
              </div>
              <div className="content-no-item">
                <span style={{ fontFamily: 'NanumSquare_R', fontSize: '20px' }}>
                  "{search_infos.search_vid}
                  {search_infos.search_aud}" 에 대한 검색결과가 존재하지
                  않습니다.
                </span>
              </div>
            </div>
          ) : search_infos.type === 'video' ? (
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
                    <span
                      style={{
                        fontFamily: 'NanumSquare_L',
                        fontSize: '20px',
                        marginLeft: '10px',
                        transform: 'translate(-100%, 0%)',
                      }}
                    >
                      {seconds2time(result.start)} - {seconds2time(result.end)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid-item content" style={{ overflow: 'scroll' }}>
              {res_infos.map((result) => (
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
                    <span
                      style={{
                        fontFamily: 'NanumSquare_L',
                        fontSize: '20px',
                        marginLeft: '10px',
                        transform: 'translate(-300%, 0%)',
                      }}
                    >
                      {seconds2time(result.start)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ProfileImg src={Profile} alt="profile" />
              <span
                style={{
                  fontFamily: 'NanumSquare_B',
                  fontSize: '22px',
                  marginLeft: '15px',
                }}
              >
                {Nickname}
              </span>
            </div>
            <div
              style={{
                marginBottom: '5px',
                paddingLeft: '40px',
                paddingRight: '40px',
                paddingTop: '15px',
                paddingBottom: '15px',
              }}
            >
              <textarea
                rows="8"
                cols="120"
                style={{
                  resize: 'none',
                  fontFamily: 'NanumSquare_L',
                  lineHeight: '23px',
                  fontSize: '15px',
                }}
              >
                {comment}
              </textarea>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                left: '45px',
              }}
            >
              <Button style={{ width: '150px' }}>
                <Stylespan>등록</Stylespan>
              </Button>
            </div>
          </div>
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
  width: 350px;
  height: 40px;

  /* z-index: 5; */
  cursor: pointer;

  /* display: inline; */
  /* align-items: center; */
  /* justify-content: center; */
  /* transition: 0.125s all ease-in; */
`;

const Stylespan = styled.span`
  color: white;
  font-size: 20px;
  font-family: NanumSquare_R;
  white-space: nowrap;
`;

const ProfileImg = styled.img`
  border-radius: 100px;
  height: 55px;
  margin-left: 10px;
  /* width: 4.5vw; */
`;

export default ResultPage;
