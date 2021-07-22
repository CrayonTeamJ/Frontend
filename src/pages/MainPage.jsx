/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import LandingInfo from '../components/LandingInfo';
import Typebtn from '../components/Typebtn';
import audio from '../img/conversation.png';
import image from '../img/speech.png';
import both from '../img/video-player.png';

function MainPage() {
  const [page, setPage] = React.useState(0);

  // 타입관련 변수들
  const [category, setCategory] = React.useState('image');
  const [txt, setTxt] = React.useState('인물');
  const [img, setImg] = React.useState(image);
  const [placehold, setPlacehold] = React.useState('인물을 검색해 보세요');
  const [Errtxt, setErrtxt] = React.useState('');

  // 검색창에서의 변수들
  const [searchAud, setSearchAud] = React.useState('');
  const [searchVid, setSearchVid] = React.useState('');

  // redux state(video_pk)
  const video_id = useSelector((state) => state.videos.video_id, []);

  const onSelectCategory = (e) => {
    setCategory(e.target.value);
    console.log(category);
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
      ['searchtype', category],
      ['searchimg', searchVid],
      ['searchaud', searchAud],
      ['id', video_id],
    ]);

    axios.get(encodeURI('http://localhost:5000/api/search'), {params});

    console.log('뭔데');
  };

  const onChangePage = (e) => {
    if (!category) {
      alert('카테고리 선택이 필요합니다.');
      setErrtxt('카테고리 선택이 필요합니다.');
      return;
    }
    if (!txt) {
      alert('카테고리 선택이 필요합니다.');
      setErrtxt('카테고리 선택이 필요합니다.');
      return;
    }
    if (!placehold) {
      alert('카테고리 선택이 필요합니다.');
      setErrtxt('카테고리 선택이 필요합니다.');
      return;
    }
    if (!img) {
      alert('카테고리 선택이 필요합니다.');
      setErrtxt('카테고리 선택이 필요합니다.');
      return;
    }

    if (category === 'image') {
      console.log(category);
      setTxt('인물');
      setImg(image);
      setPlacehold('인물을 검색해 보세요');
    } else if (category === 'audio') {
      console.log(category);
      setTxt('대사');
      setImg(audio);
      setPlacehold('대사를 검색해 보세요');
    } else if (category === 'both') {
      console.log(category);
      setTxt('대사 & 인물');
      setImg(both);
      setPlacehold('인물 및 대사를 검색해보세요');
    }

    setPage(1);
    console.log('next page');
    console.log({ category });
    console.log({ placehold });
    console.log({ txt });
  };

  if (page === 1) {
    return (
      <>
        <div className="top-container">
          <LandingInfo>
            <Label htmlFor={category} img={img}>
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
            </Label>
          </LandingInfo>
        </div>
        <div className="bottom-container">
          <div className="bottom-wrapper">
            <div>
              <div
                style={{
                  // display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  paddingTop: '5%',
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
              </div>
              <span
                style={{
                  color: 'red',
                  fontFamily: 'NanumSquare_L',
                }}
              >
                {Errtxt}
              </span>
              <div className="button-pos">
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
      {/* top container + bottom container */}
      <div className="top-container">
        {/* <span>top container</span> */}
        <LandingInfo />
      </div>
      <div className="bottom-container">
        {/* <span>bottom continer</span> */}
        <div className="bottom-wrapper">
          <Typebtn onSelectCategory={onSelectCategory} checked={category} />
          <div className="button-pos">
            <Button onClick={onChangePage}>
              <Stylespan>다음으로</Stylespan>
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
  margin-top: 3vh;
  width: 12vw;
  height: 6vh;

  margin-left: 10px;

  /* text-align: center; */
  border-radius: 50px;

  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

const Stylespan = styled.span`
  position: relative;
  font-family: NanumSquare_B;
  color: white;
  font-size: 2vw;
  display: flex;
  /* y축기준 중앙 */
  align-items: center;
  /* 축중앙 */
  justify-content: center;
  // font-size: 1.6vw;
  opacity: 1;
  white-space: nowrap;
`;
const Input = styled.input`
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
  text-align: start;
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
