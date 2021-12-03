import React,{useState, useEffect} from 'react'
import {useLocation, useHistory} from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import MenuBar from '../component/Menubar'
import CommentDisplay from '../component/CommentDisplay'
import { Button, Input } from 'semantic-ui-react'
import { NUMBER_BINARY_OPERATORS } from '@babel/types'
import { BACKEND_URL } from '../util/BackendUrl'


const Wrapper = styled.div`
    width: 100%;
    max-width: 640px;
    margin: 0px auto;
    padding-bottom: 0px;
    height: 95vh;
`

const Top = styled.div`
    width : 100%;
    height: 7vh;
    padding-top: 1vh;
    display: flex;
    justify-content: space-around;
    font-size: 3em;
    padding-top : 0.6em;
`

const Body = styled.pre`
    width: 100%;
    height: 500px;
    padding: 1em;
    border: 2px solid rgb(50, 84, 137, 0.1);
    overflow-x: hidden;
    display: inline-block;
    overflow: auto;
    white-space: pre-wrap;
`
const Bottom = styled.div`
    width: 100%;
    height : 25vh;

`
const BottomDisplay = styled.div`
    width: 100%;
    min-height : 150px;
    border: 2px solid rgb(50, 84, 137, 0.1);

`
const BottomCreate= styled.div`
    width : 100%;
    height: 200px;
    display:flex;
`
const BottomLeft = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width : 150px;
    height: 100px;
`

const BottomRight = styled.div`
  width : 120px;
  height: 100px;
  margin : 18px 10px 0px 15px;

  button{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 1.2rem;
    border: 1px solid #34558b;
    color: #34558b;
    font-size: 1.2rem;
    width: 90%;
    height: 100%;
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

const BottomMid = styled.textarea`
    width : 350px;
    height: 70px;
    margin-top:1em;
    border: 2px solid rgb(50, 84, 137, 0.1);
    border-radius: 8px;
    padding: 1em;
`

const Margin = styled.div`
    margin: 3px;
`

function PostedPage() {
    const getLocation = useLocation()
    const [postId, setPostId] = useState()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    //댓글생성관련 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [comments, setComments] = useState("")
    const [date, setDate] = useState("");

    //댓글불러오기관련 
    const [arr, setArr] = useState([])

    console.log('arr',arr);
    
    // console.log("check",getLocation.state.boardId)
    // console.log("postid",postId)



   //게시글 아이디를 state저장
    useEffect(() => {
        setPostId(getLocation.state.boardId)
    }, [postId])
    
    //저장된 게시글아이디를 바탕으로 백엔드에 요청
    useEffect(() => {
        getData()
        getComment()
    }, [postId])



    //토큰 실어서 백엔드에 요청 보냄
    const getData = () => {
        const URL = `${BACKEND_URL}/PLEA-STREET/board/find?postId=${postId}`;
        axios.get(URL,  
            {
                headers: {
                        "Content-Type":`application/json`,
                        Authorization: "Bearer "+ localStorage.getItem("accessToken"),
                        withCredentials:true
                        },
            }).then(res => settingBoard(res))
        }

    //뎃글 불러오기 
    const getComment = () => {
        const URL = `${BACKEND_URL}/PLEA-STREET/comment?boardId=${postId}`;
        axios.get(URL).then(res => setArr(res.data))
    }
    //댓글 생성하기
    const createComment = (e) => {
        e.preventDefault()
        const URL = `${BACKEND_URL}/PLEA-STREET/comment`;

        const date = new Date();
        const strdate = date.toLocaleDateString(
            'ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }
        )
    
        let body ={
            username: username,
            password: password,
            content: strdate + " " + comments,
            boardId: postId
        }

         axios.post(URL, JSON.stringify(body), {
            headers: { "Content-Type": `application/json`},
            }).then(res => {
                getComment()
                setUsername("")
                setPassword("")
                setComments("")
                }            
            )
    }

    
    //갖고온 데이터를 세팅(포스트)
    const settingBoard= (res) => {
        setTitle(res.data.title.replaceAll('<br/>','\r\n'))
        setContent(res.data.content.replaceAll('<br/>','\r\n'))
    }

    //댓글 등록
    const setUsernameHandler = (e) => {
        setUsername(e.currentTarget.value)
    }

    const setPassowrdHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const setCommentHandler = (e) => {
        setComments(e.currentTarget.value)
    }


    return (
        <Wrapper>
        <MenuBar/>
            <Top>
                {title}
            </Top>
        
            <Body>
                {content}
            </Body>
    
            <Bottom>
                <BottomDisplay>
                {arr.map(({username,content},idx)=> 
                    <CommentDisplay key={idx} username={username} content={content}/>
                )}
                </BottomDisplay>

                <form onSubmit={createComment}>
                <BottomCreate>
                        <BottomLeft>
                            <Input size ="mini" placeholder="username" value={username} onChange={setUsernameHandler}/>
                            <Margin/>
                            <Input size ="mini" placeholder="password" value={password} type="password" onChange={setPassowrdHandler}/>
                        </BottomLeft>
                    <BottomMid onChange = {setCommentHandler} value={comments} />
                        <BottomRight>
                            <button type="submit"> 등록 </button>
                        </BottomRight>
                </BottomCreate>
                </form>
            </Bottom>
    </Wrapper>
    )
}
export default PostedPage