/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';
import Typebtn from '../components/Typebtn';
import audio from '../img/conversation.png';
import image from '../img/speech.png';
import both from '../img/video-player.png';
import LoadingPage from './LoadingPage';

function MainPage({ location }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();

  const [page, setPage] = React.useState(0);

  // 타입관련 변수들
  const [category, setCategory] = React.useState('');
  const [txt, setTxt] = React.useState('');
  const [img, setImg] = React.useState(image);
  const [placehold, setPlacehold] = React.useState('');
  const [Errtxt, setErrtxt] = React.useState('');
  const [res, setRes] = React.useState('');
  const [url, setURL] = React.useState('');

  // 검색창에서의 변수들
  const [searchAud, setSearchAud] = React.useState('');
  const [searchVid, setSearchVid] = React.useState('');

  // 쿼리스트링을 이용해 전달받음
  // const video_id = useSelector((state) => state.videos.video_id, []);
  const query = queryString.parse(location.search);
  const video_id = query.id;
  // const language = query.language;

  const onChangeState = (category) => {
    // 여기부분을 함수로만들어서 await해봐야하나
    if (category === 'image') {
      console.log(category);
      setTxt('인물');
      setImg(image);
      setPlacehold('인물을 검색해 보세요');
      setURL('http://localhost:5000/api/videosearch');
    } else if (category === 'audio') {
      console.log(category);
      setTxt('대사');
      setImg(audio);
      setPlacehold('대사를 검색해 보세요');
      setURL('http://localhost:5000/api/audiosearch');
    } else if (category === 'both') {
      console.log(category);
      setTxt('대사 & 인물');
      setImg(both);
      setPlacehold('인물 및 대사를 검색해보세요');
      setURL('http://localhost:5000/api/bothsearch');
    }

    console.log('함수내부');
    console.log(txt);
    console.log(url);
  };

  const onSelectCategory = (e) => {
    setCategory(e.target.value);
    console.log(category);

    // category변수를 이용하면 한박자 느리게되어서 다이렉트로 넣어줘야함..
    onChangeState(e.target.value);
  };

  const onChangeSearchAud = (e) => {
    setSearchAud(e.target.value);
    console.log('audio');
    // console.log(searchAud);
  };

  const onChangeSearchVid = (e) => {
    setSearchVid(e.target.value);
    console.log('video');
    // console.log(searchVid);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault(); // refresh 방지
    setErrtxt('');
    console.log('onsubmit button id');
    console.log(video_id);

    if (!searchVid && category !== 'audio') {
      console.log('비디오 검색어 입력안함');
      setErrtxt('검색어를 입력해 주세요');
      return;
    }
    if (!searchAud && category !== 'image') {
      console.log('오디오 검색어 입력안함');
      setErrtxt('검색어를 입력해 주세요');
      return;
    }

    const params = new URLSearchParams([
      ['search_type', category],
      ['search_img', searchVid],
      ['search_aud', searchAud],
      ['id', video_id],
    ]);

    setIsLoading(true);

    axios
      .get(url, { params })
      .then((response) => {
        console.log('검색결과');
        console.log(response.data);
        const temp = response.data;
        setRes(temp);
        console.log('set res print');
        console.log(temp);
        setTimeout(() => {
          setIsLoading(false);
          // history.push({ pathname: `/result?${params}`, state: { res } });
          history.push({ pathname: '/result', state: { res: temp } });
        }, 3000);
        // setIsLoading(false);
        // setRes(response.data);
        // history.push(`/result?${params}`);
        // location.href=`/result?${params}`
        // location.href=`/search?id=${res.data.video_pk}`
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        // history.push({ pathname: `/result?${params}`, state: { res } });
        // history.push('/');
        history.push(`/error?errtype=search?${params}`);
      });
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

    // 여기부분을 함수로만들어서 await해봐야하나
    // if (category === 'image') {
    //   console.log(category);
    //   setTxt('인물');
    //   setImg(image);
    //   setPlacehold('인물을 검색해 보세요');
    //   setURL('http://localhost:5000/api/videosearch');
    // } else if (category === 'audio') {
    //   console.log(category);
    //   setTxt('대사');
    //   setImg(audio);
    //   setPlacehold('대사를 검색해 보세요');
    //   setURL('http://localhost:5000/api/audiosearch');
    // } else if (category === 'both') {
    //   console.log(category);
    //   setTxt('대사 & 인물');
    //   setImg(both);
    //   setPlacehold('인물 및 대사를 검색해보세요');
    //   setURL('http://localhost:5000/api/bothsearch');
    // }
    // 여기까지

    // onChangeState(category);

    setPage(1);
    console.log('next page');
    console.log({ category });
    console.log({ placehold });
    console.log({ txt });
    console.log({ url });
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
                {/* <Label htmlFor={category} img={img}>
                <img
                  src={img}
                  style={{
                    width: '50%',
                    display: 'flex',
                    transform: 'translate(50%, 50%)',
                  }}
                  alt="icon"
                />
                <StyleSpan>{txt} 검색</StyleSpan>
                <br />
                <StyletextSpan>{placehold}</StyletextSpan>
              </Label> */}
                <Label htmlFor={category} img={img}>
                  <div className="button-grid">
                    <div className="button-grid-item">
                      <img
                        src={img}
                        style={{
                          width: '50%',
                          // transform: 'translate(50%, 50%)',
                        }}
                      />
                    </div>
                    <div
                      className="button-grid-item"
                      style={{
                        fontFamily: 'NanumSquare_EB',
                        // position: 'absolute',
                        fontSize: '16px',
                      }}
                    >
                      {txt}
                      {/* <StyleSpan>{txt} 검색</StyleSpan> */}
                    </div>
                    <div
                      className="button-grid-item"
                      style={{
                        fontFamily: 'NanumSquare_L',
                        // position: 'absolute',
                        fontSize: '12px',
                      }}
                    >
                      {placehold}
                      {/* <StyletextSpan>{placehold}</StyletextSpan> */}
                    </div>
                  </div>
                </Label>
              </LandingInfo>
            </div>
            <div className="main-grid-item mid">
              <span>MID</span>
            </div>
            <div className="main-grid-item bot">
              <div
                className="bot-grid-item"
                style={{
                  // display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // position: 'relative',
                  // paddingTop: '5%',
                  // paddingBottom: '2%',
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
                  {/* <Link to="/result" style={{ textDecoration: 'none' }}> */}
                  <Stylespan>검색하기</Stylespan>
                  {/* </Link> */}
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
        {/* top container + bottom container */}
        <div className="main-grid-container">
          {/* <span>top container</span> */}
          <div className="main-grid-item top">
            <LandingInfo />
          </div>
          <div className="main-grid-item mid">
            <span>MID</span>
          </div>
          <div className="main-grid-item bot">
            {/* <span>bottom continer</span> */}
            {/* <div className="bottom-wrapper"> */}
            <div className="bot-grid-item">
              {/* <span>랄ㄹ</span> */}
              <Typebtn onSelectCategory={onSelectCategory} checked={category} />
            </div>
            <div className="bot-grid-item">
              <Button onClick={onChangePage}>
                <Stylespan>다음으로</Stylespan>
              </Button>
            </div>
          </div>
          {/* </div> */}
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

const Stylespan = styled.span`
  position: relative;
  font-family: NanumSquare_B;
  color: white;
  font-size: 25px;
  // font-size: 1.6vw;
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

// 버튼모양
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
  /* background: no-repeat center url(${(props) => props.img}) white;
  background-image: ${(props) => props.img}; */
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

export default MainPage;
