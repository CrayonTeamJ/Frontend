/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import LandingInfo from '../components/LandingInfo';
import LoadingPage from './LoadingPage';

// main page ( video upload page)

function UploadPage() {
  // 기타 변수
  const isLogin = useSelector((state) => state.users.isLogin, []);
  const [isLoading, setIsLoading] = React.useState(false);

  // video 파일 관련 변수
  const [lang, setLang] = React.useState('ko-KR');
  const [category, setCategory] = React.useState('0');
  const [link, setLink] = React.useState('');
  const [Errtxt, setErrtxt] = React.useState('');

  // 페이지 이전
  const history = useHistory();

  // event에 따른 video변수 변경
  const onSelectLang = (e) => {
    setLang(e.target.value);
    // console.log(lang);
  };

  const onSelectCategory = (e) => {
    setCategory(e.target.value);
    // console.log(category);
  };

  const onChangeURL = (e) => {
    setLink(e.target.value);
    // console.log(link);
  };

  // 비 로그인 시 회원 전용알림
  const onLoginRequest = (e) => {
    history.push('/memberonly');
  };

  // 비디오 업로드 버튼 클릭 시
  const onSubmitHandler = (e) => {
    e.preventDefault(); // refresh 방지
    setErrtxt('');

    // console.log(lang);
    // console.log(category);
    // console.log(link);

    const video_file =
      document.getElementById('local_file') === null
        ? 'null'
        : document.getElementById('local_file');

    // video type에 따라 다른 함수 실행
    if (category === '0') {
      // url 로 비디오 입력시

      // 필요 변수 입력 여부 체크
      if (!link) {
        setErrtxt('URL을 입력해주세요');
        return; // 더 이상 진행하지 않음
      }
      onSubmitUrl(); // 서버로 요청함수
    } else if (category === '1') {
      // local file로 비디오 입력시
      if (video_file === null) {
        setErrtxt('파일을 입력해 주세요.');
        return;
      }
      onSubmitFile(video_file); // 서버로 요청 함수
    }
  };

  // local file 전송 함수
  const onSubmitFile = (videofile) => {
    // 서버로 전송할 데이터
    const submitData = new FormData();

    submitData.append('language', lang);
    submitData.append('video_type', category);
    submitData.append('file', videofile.files[0]);

    // console.log('submit data');
    // console.log(submitData);

    // 로딩 페이지
    setIsLoading(true);

    // 전송
    axios
      .post('http://localhost:5000/api/videoUpload', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // 응답 처리
        if (res.data.Result === 'Success') {
          // console.log('s3업로드 완료');

          // // 이 부분 아마 사라질 것
          // const params = new URLSearchParams([
          //   ['id', res.data.video_pk],
          //   ['language', lang],
          // ]);

          // axios
          //   .get('http://localhost:5000/api/detect', { params })

          //   .catch((err) => {
          //     console.log(err);
          // setIsLoading(false);
          // history.push({ pathname: `/result?${params}`, state: { res } });
          // history.push('/');
          // });

          // 로딩 페이지 사라짐
          setIsLoading(false);
          // 다음 페이지로 정보 전달
          location.href = `/search?id=${res.data.video_pk}&language=${lang}`;
        } else if (res.data.Result === 'false') {
          // 업로드 실패시
          // console.log('s3업로드 에러발생');
          setIsLoading(false);
          setErrtxt('유효하지 않은 파일입니다.');
          history.push('/');
        }
      })
      .catch((err) => {
        // 예외 처리
        // console.log(err);
        setIsLoading(false);
        // 에러 페이지로 넘김
        history.push('/error?errtype=upload video');
        // setErrtxt('서버에러');
      });
  };

  // url video 전송
  const onSubmitUrl = () => {
    const submitData = new FormData();

    submitData.append('language', lang);
    submitData.append('video_type', category);
    submitData.append('video_url', link);

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
          // console.log('s3업로드 완료');

          // 사라질 듯
          // const params = new URLSearchParams([
          //   ['id', res.data.video_pk],
          //   ['language', lang],
          // ]);

          // axios
          //   .get('http://localhost:5000/api/detect', { params })
          //   .then((response) => {
          //     console.log(response);
          //     alert('욜로가 완료되었다');
          //   })
          //   .catch((err) => {
          //     console.log(err);
          // setIsLoading(false);
          // history.push({ pathname: `/result?${params}`, state: { res } });
          // history.push('/');
          // });

          setIsLoading(false);
          location.href = `/search?id=${res.data.video_pk}&language=${lang}`;
        } else if (res.data.Result === 'false') {
          // console.log('s3업로드 에러발생');
          setErrtxt('유효하지 않은 url입니다.');
          setIsLoading(false);
          history.push('/');
        }
      })
      .catch((err) => {
        // 예외 처리
        // console.log(err);
        setIsLoading(false);
        history.push('/error?errtype=upload video');
        setErrtxt('서버에러');
      });
  };

  // 로딩 페이지 띄우기
  if (isLoading) {
    return <LoadingPage message="영상을 업로드 중입니다." />;
  }

  return (
    <>
      <div className="main-container">
        <div className="main-grid-container">
          <div className="main-grid-item top">
            <LandingInfo />
          </div>
          <div className="main-grid-item mid">
            <></>
          </div>
          <div className="main-grid-item bot">
            <div className="bot-grid-item" style={{ padding: '50px' }}>
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
            <div className="bot-grid-item">
              <Button
                onClick={isLogin === true ? onSubmitHandler : onLoginRequest}
              >
                <Stylespan>시작하기</Stylespan>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// style
const Button = styled.button`
  // 디자인관련
  background: #fa605a;
  cursor: pointer;
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 50px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  // 크기 관련
  width: 180px;
  height: 50px;

  /* margin-top: 50px; */
  /* margin-left: 10px; */
  /* text-align: center; */
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
  opacity: 1;
  white-space: nowrap;
`;

const InputURL = styled.input`
  padding: 10px;
  margin-top: 40px;
  border-radius: 10px;
  border: 1px solid #404040;
  width: 60vw;
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
