import axios from 'axios'
import React,{useState} from 'react'
import styled from "styled-components"
import MenuBar from '../component/Menubar'
import { useHistory} from 'react-router-dom'
import { Button, Input } from 'semantic-ui-react'
import { BACKEND_URL } from '../util/BackendUrl'

const Wrapper = styled.div`
    width: 100%;
    max-width: 640px;
    margin: 0px auto;
    padding-bottom: 0px;
    height: 78vh;
`

const Top = styled.div`
  width : 100%;
  height: 7vh;
  padding-top: 1vh;
  display: flex;
  justify-content: space-around;

  button{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 1.2rem;
    border: 1px solid #34558b;
    color: #34558b;
    font-size: 1.2rem;
    width: 20%;
    height: 80%;
    font-weight: bold;
    margin: 1rem;
    padding: 10px;
    &:hover{
      background-color: #34558b;
      color: white;
      opacity: 0.9;
    }
  }

`

const Body = styled.div`
    width: 100%;
    height: 80vh;
    overflow-x: hidden;
    display: inline-block;
`

const Title = styled.div`
    width : 100%;
    border: 2px solid rgb(50, 84, 137, 0.1);
`

const Content = styled.textarea`
    width : 100%;
    height: 500px;
    padding: 1em;
    border: 2px solid rgb(50, 84, 137, 0.1);
`
const Btn = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 1.2rem;
    border: 1px solid #34558b;
    color: #34558b;
    font-size: 1.2rem;
    width: 20%;
    height: 80%;
    font-weight: bold;
    margin: 0;
    &:hover{
        background-color: #34558b;
        color: white;
        opacity: 0.9;
    }
`


function PostWrite() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const history = useHistory();
  

    //게시글 제출 핸들러
    //토큰, 제목, 내용을 같이 보냄
    const SubmitHandler =(e) =>{
        const accesstoken = localStorage.getItem("accessToken")
        console.log(accesstoken)
        let body = {
            title: title,
            content: content,
            token: localStorage.getItem("accessToken")
        }
        axios.post(`${BACKEND_URL}/PLEA-STREET/board`, JSON.stringify(body),{
            headers: {
                "Content-Type":`application/json`,
                Authorization: "Bearer "+ localStorage.getItem("accessToken"),
                withCredentials:true
            },
        }).then(res=> console.log(res),
            history.push({
            pathname:"/PLEA-STREET/community",
            state:{
                title: title
            }
    
        })).catch(err => {alert("에러발생")})
    }

    const titleHandler = (e) =>{
        setTitle(e.currentTarget.value)
    }

    const contentHandler = (e) => {
        setContent(e.currentTarget.value.replace(/(?:\r\n|\r|\n)/g,'<br/>'))

    }
    
    return (
        <Wrapper>
            <MenuBar/>
            <form onSubmit={SubmitHandler}>     
                <Body>
                <Top/>
                <Title >
                    <Input fluid placeholder="제목" onChange={titleHandler}/>
                </Title>
                <Content type="text" wrap="hard" onChange={contentHandler}>
                </Content>
                <Top>
                    <button type="submit">저장하기</button>
                </Top>
                </Body>
            </form>
        </Wrapper>
    )
}

export default PostWrite
