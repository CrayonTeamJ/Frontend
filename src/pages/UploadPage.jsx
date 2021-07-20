/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LandingInfo from '../components/LandingInfo';

function UploadPage() {
  const [lang, setLang] = React.useState('ko-KR');
  const [category, setCategory] = React.useState('0');
  const [link, setLink] = React.useState('');

  const onSelectLang = (e) => {
    setLang(e.target.value);
    console.log(lang);
  };

  const onSelectCategory = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };

  const onChangeURL = (e) => {
    setLink(e.target.value);
    console.log(link);
  };

  const onSubmitHandler = (e) => {
    const video_file =
      document.getElementById('local_file') === null
        ? 'null'
        : document.getElementById('local_file');

    const video_url = link === '' ? 'null' : { link };

    console.log('video_url');
    console.log(video_url);

    if (category === '0') {
      onSubmitUrl(video_url);
    } else if (category === '1') {
      onSubmitFile(video_file);
    }
  };

  const onSubmitFile = (videofile) => {
    const submitData = new FormData();
    // const video_file = document.getElementById('local_file');

    submitData.append('language', lang);
    submitData.append('video_type', category);
    submitData.append('file', videofile.files[0]);
    console.log('submitData for url');
    console.log(submitData.language);

    console.log('submitData for file');
    console.log(submitData);
    axios
      .post('http://localhost:5000/api/videoUpload', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // 응답 처리
        console.log(res);
      })
      .catch((err) => {
        // 예외 처리
        console.log(err);
      });
  };

  const onSubmitUrl = (url) => {
    const submitData = new FormData();

    submitData.append('language', lang);
    submitData.append('video_type', category);
    submitData.append('video_url', link);
    console.log('submitData for url');
    console.log(submitData.language);

    axios
      .post('http://localhost:5000/api/videoUpload', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // 응답 처리
        console.log(res);
      })
      .catch((err) => {
        // 예외 처리
        console.log(err);
      });
  };

  return (
    <>
      <div className="top-container">
        <LandingInfo />
      </div>
      <div className="bottom-container">
        <div className="bottom-wrapper">
          <div style={{ padding: '50px' }}>
            <div style={{ padding: '5px' }}>
              <Label>Language : </Label>
              <input
                type="radio"
                id="kor"
                name="kor"
                value="ko-KR"
                checked={lang === 'ko-KR'}
                onChange={onSelectLang}
              />
              <Label htmlFor="ko-KR">KOREAN</Label>
              <input
                type="radio"
                id="eng"
                name="eng"
                value="eu-US"
                checked={lang === 'eu-US'}
                onChange={onSelectLang}
              />
              <Label htmlFor="eu-US">ENGLISH</Label>
            </div>
            <div style={{ padding: '5px' }}>
              <Label>Video type : </Label>
              <input
                type="radio"
                id="youtube"
                name="youtube"
                value="0"
                checked={category === '0'}
                onChange={onSelectCategory}
              />
              <Label htmlFor="youtube">URL</Label>
              <input
                type="radio"
                id="local"
                name="local"
                value="1"
                checked={category === '1'}
                onChange={onSelectCategory}
              />
              <Label htmlFor="local">FILE</Label>
            </div>

            {/* <Radiobtn type="Language : " A="KOREAN" B="ENGLISH" />
            <Radiobtn type="Video type : " A="FILE" B="URL" /> */}
            <form encType="multipart/form-data">
              {category === '0' ? (
                <InputURL
                  placeholder="youtube link를 입력해 주세요."
                  value={link}
                  onChange={onChangeURL}
                />
              ) : (
                <InputFILE type="file" name="local_file" id="local_file" />
              )}
            </form>
          </div>

          <div className="button-pos">
            <Button onClick={onSubmitHandler}>
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <Stylespan>시작하기</Stylespan>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
const Button = styled.button`
  background: #fa605a;

  cursor: pointer;

  font-size: 20px;

  color: white;

  border: none;
  /* margin-top: 50px; */
  width: 12vw;
  height: 6vh;

  /* margin-left: 10px; */

  /* text-align: center; */
  border-radius: 50px;

  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  /* position: absolute; */
`;

const Stylespan = styled.span`
  position: relative;
  font-family: NanumSquare_B;
  color: white;
  font-size: 25px;
  // font-size: 1.6vw;
  opacity: 1;
  white-space: nowrap;
`;

const InputURL = styled.input`
  padding: 10px;
  margin-top: 40px;
  border-radius: 10px;
  border: 1px solid #404040;
  width: 80%;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;

const InputFILE = styled.input`
  padding: 10px;
  margin-top: 30px;
  font-family: NanumSquare_L;
  /* width: 100%; */
  /* outline: none; */
  font-size: 15px;
  display: absolute;

  transform: translate(20%);
`;

// 버튼모양
const Label = styled.label`
  font-family: NanumSquare_EB;
  color: #404040;
`;

export default UploadPage;
