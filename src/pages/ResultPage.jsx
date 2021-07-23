/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';

function ResultPage() {
  const location = useLocation();

  //   const query = queryString.parse(location.search);
  //   const video_id = query.id;
  //   const type = query.searchtype;
  //   const search_aud = query.searchaud;
  //   const search_img = query.searchimg;
  const { res } = location.state;
  //   console.log('result page');
  //   console.log(res);
  return (
    <>
      <div className="top-container">
        <span>
          <div>
            <span>{res.id}</span>
            <span>{res.searchtype}</span>
            <span>{res.searchimg}</span>
            <span>{res.searchaud}</span>
          </div>
        </span>
        {/* <span>{video_id}</span>
        <br />
        <span>{type}</span>
        <br />
        <span>{search_aud}</span>
        <br />
        <span>{search_img}</span> */}
        <br />
      </div>
      <div className="bottom-container">
        <span>bottom container</span>
      </div>
    </>
  );
}

export default ResultPage;
