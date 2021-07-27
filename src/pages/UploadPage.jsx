/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import LandingInfo from '../components/LandingInfo';
// import { video_initID } from '../redux/videos';
import LoadingPage from './LoadingPage';

function UploadPage() {
  const isLogin = useSelector((state) => state.users.isLogin, []);
  const [lang, setLang] = React.useState('ko-KR');
  const [category, setCategory] = React.useState('0');
  const [link, setLink] = React.useState('');
  const [Errtxt, setErrtxt] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [id, setID] = React.useState('');
  const history = useHistory();
  // const dispatch = useDispatch();

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

  const onLoginRequest = (e) => {
    location.href = '/memberonly';
  };

  const onSubmitHandler = (e) => {
    e.preventDefault(); // refresh 방지
    setErrtxt('');

    console.log(lang);
    console.log(category);
    console.log(link);

    const video_file =
      document.getElementById('local_file') === null
        ? 'null'
        : document.getElementById('local_file');

    if (category === '0') {
      // 입력 안했을 때
      if (!link) {
        setErrtxt('URL을 입력해주세요');
        return; // 오류나면 더 진행하지(서버로안감) 않고 끊어야해서 리턴임
      }
      onSubmitUrl();
    } else if (category === '1') {
      if (video_file === null) {
        setErrtxt('파일을 입력해 주세요.');
        return;
      }
      onSubmitFile(video_file);
    }
  };

  const onSubmitFile = (videofile) => {
    const submitData = new FormData();
    // const video_file = document.getElementById('local_file');

    submitData.append('language', lang);
    submitData.append('video_type', category);
    submitData.append('file', videofile.files[0]);

    console.log('submit data');
    console.log(submitData);

    setIsLoading(true);
    axios
      .post('http://localhost:5000/api/videoUpload', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // 응답 처리
        if (res.data.Result === 'Success') {
          console.log('s3업로드 완료');

          // console.log(res.data.video_pk);

          const params = new URLSearchParams([
            ['id', res.data.video_pk],
            ['language', lang],
          ]);

          axios
            .get('http://localhost:5000/api/detect', { params })

            .catch((err) => {
              console.log(err);
              // setIsLoading(false);
              // history.push({ pathname: `/result?${params}`, state: { res } });
              // history.push('/');
            });

          // dispatch(video_initID(res.data.video_pk));
          setIsLoading(false);
          location.href = `/search?id=${res.data.video_pk}&language=${lang}`;
          // history.push('/search');
        } else if (res.data.Result === 'false') {
          console.log('s3업로드 에러발생');
          setIsLoading(false);
          setErrtxt('유효하지 않은 파일입니다.');
          // location.href('/');
          history.push('/');
        }
      })
      .catch((err) => {
        // 예외 처리
        console.log(err);
        setIsLoading(false);
        // location.href('/');
        history.push('/');
        setErrtxt('유효하지 않은 파일입니다.');
      });
  };

  const onSubmitUrl = () => {
    const submitData = new FormData();

    submitData.append('language', lang);
    submitData.append('video_type', category);
    submitData.append('video_url', link);

    // FormData의 value 확인
    console.log('form data value');
    for (const value of submitData.values()) {
      console.log(value);
    }
    console.log('form data key');
    for (const key of submitData.keys()) {
      console.log(key);
    }

    console.log(submitData);
    console.log(lang);
    console.log(category);
    console.log(link);

    // console.log(axios.headers.Authorization)
    // trackPromise(
    setIsLoading(true);

    axios
      .post('http://localhost:5000/api/videoUpload', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // 응답 처리
        if (res.data.Result === 'Success') {
          console.log('s3업로드 완료');

          const params = new URLSearchParams([
            ['id', res.data.video_pk],
            ['language', lang],
          ]);

          axios
            .get('http://localhost:5000/api/detect', { params })
            .then((response) => {
              console.log(response);
              alert('욜로가 완료되었다');
            })
            .catch((err) => {
              console.log(err);
              // setIsLoading(false);
              // history.push({ pathname: `/result?${params}`, state: { res } });
              // history.push('/');
            });

          // dispatch(video_initID(res.data.video_pk));
          setIsLoading(false);
          location.href = `/search?id=${res.data.video_pk}&language=${lang}`;
          // history.push('/search?id='`{res.data.video_pk}`);
        } else if (res.data.Result === 'false') {
          console.log('s3업로드 에러발생');
          setErrtxt('유효하지 않은 url입니다.');
          setIsLoading(false);
          // location.href('/');
          history.push('/');
        }
      })
      .catch((err) => {
        // 예외 처리
        console.log(err);
        setErrtxt('유효하지 않은 url입니다.');
        setIsLoading(false);
        // location.href('/');
        history.push('/');
      });
  };

  if (isLoading) {
    return <LoadingPage message="영상을 업로드 중입니다." />;
  }

  return (
    <>
      <div className="main-grid-container">
        <div className="main-grid-item top">
          <LandingInfo />
        </div>
        <div className="main-grid-item mid">
          <span>MID</span>
        </div>
        <div className="main-grid-item bot">
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
                value="en-US"
                checked={lang === 'en-US'}
                onChange={onSelectLang}
              />
              <Label htmlFor="en-US">ENGLISH</Label>
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
            <ErrLabel>{Errtxt}</ErrLabel>
          </div>
          <div className="button-pos">
            <Button
              onClick={isLogin === true ? onSubmitHandler : onLoginRequest}
            >
              {/* <Link to="/search?id=" style={{ textDecoration: 'none' }}> */}
              <Stylespan>시작하기</Stylespan>
              {/* </Link> */}
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
  width: 180px;
  height: 50px;

  /* margin-left: 10px; */

  /* text-align: center; */
  border-radius: 50px;

  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  /* position: absolute; */
`;

const ErrLabel = styled.label`
  font-size: 15px;
  font-family: 'NanumSquare_R';
  color: #fa605a;
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
  width: 900px;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;

const InputFILE = styled.input`
  padding: 10px;
  margin-top: 30px;
  font-family: NanumSquare_L;
  /* width: 900px; */
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
