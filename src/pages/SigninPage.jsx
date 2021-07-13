import '../App.css';
import React from 'react';
import Navigationbar from '../components/Navigationbar';
import Template from '../components/Template';
import styled from 'styled-components';
import axios from 'axios';

const TemplateBlock = styled.div`
  width: 512px;
  height: 400px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 120px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;

  opacity: 1;

  h1 {
    margin: 0;
    margin-top: 40px;
    margin-bottom: 5px;
    font-size: 30px;
    text-align: center;
    font-family: 'BwSurco';
    color: #404040;
  }

`;


const LogBlock = styled.div`
  padding-left: 5px;
  padding-top: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  position: relative;
  transform: translate(0,30%);
`;

const InsertForm = styled.form`
  padding-left: 50px;
  padding-top: 2%;
  padding-right: 50px;
  padding-bottom: 2%;
  
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;


const Button = styled.button`
  background: #85BCBE;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 200px;
  height: 35px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, -100%); /* 버튼위치 */
  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

const Label = styled.label`

  padding: 5px;
  font-size: 12px;
  font-family: "NanumSquare_R";
  color: #FA605A;

`;


function SigninPage(props) {


  const [UserID, setUserID] = React.useState("")
  const [Password, setPassword] = React.useState("")
  const [Errtxt, setErrtxt] = React.useState("")


  const onChangeID = e => {
    setUserID(e.target.value);
  };

  const onChangePW = e => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = e =>{
    e.preventDefault(); //refresh 방지
    setErrtxt(""); 

    if(!UserID){
      setErrtxt("ID를 입력해주세요");
      return;
    }
    else if(!Password){
      setErrtxt("비밀번호를 입력해주세요");
      return;
    }


    let formbody={
      userID: UserID,
      password: Password,
    }

    axios.post('/api/login',
    formbody, 
    {
      headers: {
      'content-type': 'application/json'
      },
    }
  ).then((res)=>{
    if(res['data']['Result']==="Login_Success"){ //login sucess
      console.log("로그인 성공")
    }
    else{//login error( )
      console.log("로그인 실패")


      //닉네임 중복
      if(res['data']['Result']==='Login_Fail'){

        console.log("비번이나 아이디 틀림");
        setErrtxt("아이디와 비밀번호를 확인해주세요");
      }

    }
  })
  .catch((err) => {
    //Hide Loader
    console.error(err);
  });


  }


  return (
    <div className="container">
      <Navigationbar></Navigationbar>
        <TemplateBlock>
            <h1> SIGN IN </h1>
                <InsertForm style={{marginBottom: '15px'}}>
                    <Input value={UserID} autoFocus placeholder="ID" onChange={onChangeID} />
                    <Input value={Password} autoFocus placeholder="Password" onChange={onChangePW}/>
                <Label>{Errtxt}</Label>
              <Button onClick={onSubmitHandler}> LOGIN </Button>
        </InsertForm> 
    </TemplateBlock>
    </div>
  );
}

export default SigninPage;