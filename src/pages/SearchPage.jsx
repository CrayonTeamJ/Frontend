/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import LandingInfo from '../components/LandingInfo';
import Typebtn from '../components/Typebtn';
import audio from '../img/conversation.png';
import image from '../img/speech.png';
import both from '../img/video-player.png';
import LoadingPage from './LoadingPage';
import { status_getID, status_unsetID } from '../redux/status';
// 검색 페이지

function SearchPage({ location }) {
  const dispatch = useDispatch();

  // 임시
  const yolo_id = useSelector((state) => state.status.yolo_id, []);
  const clova_id = useSelector((state) => state.status.clova_id, []);

  console.log('정확하게 저장이 되었나?');
  console.log(yolo_id);
  console.log(clova_id);

  // 기타 변수
  const [isLoading, setIsLoading] = React.useState(false);

  // 타입관련 변수들
  const [category, setCategory] = React.useState('');
  const [txt, setTxt] = React.useState('');
  const [img, setImg] = React.useState(image);
  const [placehold, setPlacehold] = React.useState('');
  const [Errtxt, setErrtxt] = React.useState('');
  const [res, setRes] = React.useState('');
  const [url, setURL] = React.useState('');
  const [page, setPage] = React.useState(0);

  // 검색창에서의 변수들
  const [searchAud, setSearchAud] = React.useState('');
  const [searchVid, setSearchVid] = React.useState('');

  // 페이지 이전
  const history = useHistory();

  // 쿼리스트링을 이용해 video 전달
  const query = queryString.parse(location.search);
  const video_id = query.id;

  // 변수를 변경하는 함수
  const onChangeState = (category) => {
    if (category === 'image') {
      // console.log(category);
      setTxt('인물');
      setImg(image);
      setPlacehold('인물을 검색해 보세요');
      setURL('http://localhost:5000/api/videosearch');
    } else if (category === 'audio') {
      // console.log(category);
      setTxt('대사');
      setImg(audio);
      setPlacehold('대사를 검색해 보세요');
      setURL('http://localhost:5000/api/audiosearch');
    } else if (category === 'both') {
      // console.log(category);
      setTxt('대사 & 인물');
      setImg(both);
      setPlacehold('인물 및 대사를 검색해보세요');
      setURL('http://localhost:5000/api/multiplesearch');
    }

    // console.log('함수내부');
    // console.log(txt);
    // console.log(url);
  };

  // 변수 변경 함수
  const onSelectCategory = (e) => {
    setCategory(e.target.value);
    // console.log(category);
    // category변수를 이용하면 한박자 느리게되어서 다이렉트로
    onChangeState(e.target.value);
  };

  const onChangeSearchAud = (e) => {
    setSearchAud(e.target.value);
    // console.log('audio');
    // console.log(searchAud);
  };

  const onChangeSearchVid = (e) => {
    setSearchVid(e.target.value);
    // console.log('video');
    // console.log(searchVid);
  };

  // 검색버튼 클릭 화면
  const onSubmitHandler = (e) => {
    e.preventDefault(); // refresh 방지
    setErrtxt('');

    if (!searchVid && category !== 'audio') {
      // console.log('비디오 검색어 입력안함');
      setErrtxt('검색어를 입력해 주세요');
      return;
    }
    if (!searchAud && category !== 'image') {
      // console.log('오디오 검색어 입력안함');
      setErrtxt('검색어를 입력해 주세요');
      return;
    }

    const formbody = {
      yolo_id,
      clova_id,
    };

    const params = new URLSearchParams([
      ['search_type', category],
      ['search_img', searchVid],
      ['search_aud', searchAud],
      ['id', video_id],
    ]);

    setIsLoading(true);
    console.log('url제대로 바뀌는가');
    console.log(url);

    // yolo와 clova 상태 물어보기
    if (yolo_id !== 'duplicate') {
      axios
        .post('http://localhost:5000/api/apiStatus', formbody, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          // console.log('post status response');
          console.log('욜로와 클로바 상태');
          console.log(res.data);

          if (
            res.data.yolo_res === 'Success' &&
            res.data.clova_res === 'Success'
          ) {
            // 검색 쿼리 전송
            axios
              .get(url, { params })
              .then((response) => {
                const temp = response.data;
                setRes(temp);
                setIsLoading(false);
                history.push({ pathname: '/result', state: { res: temp } });
              })
              .catch((err) => {
                setIsLoading(false);
                history.push(`/error?errtype=search?${params}`);
              });
            // yolo, clova 삭제
            dispatch(status_unsetID());
          } else {
            setIsLoading(false);
            history.push('/error?errtype=yolo clova');
          }
        })
        .catch((err) => {
          setIsLoading(false);
          history.push('/error?errtype=yolo clova');
        });
    } else {
      // 중복인 경우는 물어보지 않고 바로 실행
      axios
        .get(url, { params })
        .then((response) => {
          const temp = response.data;
          setRes(temp);
          setIsLoading(false);
          history.push({ pathname: '/result', state: { res: temp } });
        })
        .catch((err) => {
          setIsLoading(false);
          history.push(`/error?errtype=search?${params}`);
        });
    }
    // axios
    //   .get(url, { params })
    //   .then((response) => {
    //     const temp = response.data;
    //     setRes(temp);
    //     setIsLoading(false);
    //     history.push({ pathname: '/result', state: { res: temp } });
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     history.push(`/error?errtype=search?${params}`);
    //   });
  };

  const onChangePage = (e) => {
    if (!category) {
      alert('카테고리 선택이 필요합니다.');
      // setErrtxt('카테고리 선택이 필요합니다.');
      return;
    }
    if (!txt) {
      alert('카테고리 선택이 필요합니다.');
      // setErrtxt('카테고리 선택이 필요합니다.');
      return;
    }
    if (!placehold) {
      alert('카테고리 선택이 필요합니다.');
      // setErrtxt('카테고리 선택이 필요합니다.');
      return;
    }
    if (!img) {
      alert('카테고리 선택이 필요합니다.');
      // setErrtxt('카테고리 선택이 필요합니다.');
      return;
    }

    setPage(1);
  };

  if (isLoading) {
    return <LoadingPage message="영상 내 인물 및 대사를 검색 중 입니다." />;
  }
  if (page === 1) {
    return (
      <>
        <div className="main-container">
          <div className="main-grid-container">
            <div className="main-grid-item top">
              <LandingInfo>
                <Label htmlFor={category} img={img}>
                  <div className="button-grid">
                    <div className="button-grid-item">
                      <img
                        src={img}
                        style={{
                          width: '50%',
                        }}
                      />
                    </div>
                    <div
                      className="button-grid-item"
                      style={{
                        fontFamily: 'NanumSquare_EB',
                        fontSize: '16px',
                      }}
                    >
                      {txt}
                    </div>
                    <div
                      className="button-grid-item"
                      style={{
                        fontFamily: 'NanumSquare_L',
                        fontSize: '12px',
                      }}
                    >
                      {placehold}
                    </div>
                  </div>
                </Label>
              </LandingInfo>
            </div>
            <div className="main-grid-item mid" />

            <div className="main-grid-item bot">
              <div
                className="bot-grid-item"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {category === 'both' ? (
                  <>
                    <Input
                      placeholder="인물을 입력하세요"
                      value={searchVid}
                      onChange={onChangeSearchVid}
                    />
                    <Input
                      placeholder="대사를 입력해세요"
                      value={searchAud}
                      onChange={onChangeSearchAud}
                    />
                  </>
                ) : (
                  <div style={{ paddingTop: '5%' }}>
                    <Input
                      className="bot-grid-item"
                      placeholder={placehold}
                      value={category === 'audio' ? searchAud : searchVid}
                      onChange={
                        category === 'audio'
                          ? onChangeSearchAud
                          : onChangeSearchVid
                      }
                    />
                  </div>
                )}

                <span
                  style={{
                    color: 'red',
                    fontFamily: 'NanumSquare_L',
                  }}
                >
                  {Errtxt}
                </span>
              </div>
              <div className="bot-grid-item">
                <Button onClick={onSubmitHandler}>
                  <Stylespan>검색하기</Stylespan>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="main-container">
        <div className="main-grid-container">
          <div className="main-grid-item top">
            <LandingInfo />
          </div>
          <div className="main-grid-item mid" />

          <div className="main-grid-item bot">
            <div className="bot-grid-item">
              <Typebtn onSelectCategory={onSelectCategory} checked={category} />
            </div>
            <div className="bot-grid-item">
              <Button onClick={onChangePage}>
                <Stylespan>다음으로</Stylespan>
              </Button>
            </div>
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
  width: 180px;
  height: 50px;

  border-radius: 50px;

  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

const Stylespan = styled.span`
  position: relative;
  font-family: NanumSquare_B;
  color: white;
  font-size: 25px;
  opacity: 1;
  white-space: nowrap;
`;

const Input = styled.input`
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

const Label = styled.label`
  display: inline-block;
  padding-top: 3vh;
  padding-bottom: 3vh;
  padding-left: 3vh;
  padding-right: 3vh;
  width: 15vw;
  height: 25vh;
  border-radius: 25px;
  background-color: white;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
  /* text-align: start; */
`;

const StyleSpan = styled.span`
  font-family: NanumSquare_EB;
  position: absolute;
  font-size: 16px;
  /* display: inline; */
  bottom: 1vh;
  padding-bottom: 5px;
  letter-spacing: 0px;
  /* margin-left: 30px;
  margin-top: 100px; */
`;

const StyletextSpan = styled.span`
  font-family: NanumSquare_L;
  font-size: 10px;
  color: #5b5b5b;
  position: absolute;
  bottom: -1.5vh;
  letter-spacing: 0px;
  /* line-height: 1.5vh; */
  /* padding-left: 30px; */
`;

export default SearchPage;
