import React,{useState} from 'react'
import MenuBar from '../component/Menubar'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router'
import { useEffect } from 'react/cjs/react.development'
import PostList from "../component/PostListComponent"
import { Button, Icon } from 'semantic-ui-react'

const Wrapper = styled.div`
    width: 100%;
    max-width: 640px;
    margin: 0px auto;
    padding-bottom: 0px;
    height: 78vh;
`

const PostListWrap = styled.div`
    max-width : 640px;
    height: 70vh;
`

const Top = styled.div`
    width : 100%;
    height: 7vh;
    padding-top: 1vh;
    display: flex;
    justify-content: space-around;
`

const Body = styled.div`
    width: 100%;
    height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
`


function CommunityPage() {
    const history = useHistory();
    const getlocation = useLocation();
    const [notlogged, setNotlogged] = useState(true)
    
    console.log(getlocation);

    //새로고침 
    // useEffect(()=>{pageReload()},[])

    //최초 진입시 토큰 확인
    useEffect(() => {checkTokenHandler()
    },[])


    //토큰 유무로 로그인 여부 확인
    const checkTokenHandler =() => {
        if(localStorage.getItem("accessToken")){
            setNotlogged(false)
        }
    }


    //새로고침 컨트롤러
    // const pageReload = () => {
    //     const reloadCount = sessionStorage.getItem('reloadCount');
    //     if(reloadCount < 2) {
    //         sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //         window.location.reload();
    //       } else {
    //         sessionStorage.removeItem('reloadCount');
    //       }
    // }

    //글작성 핸들러
    const PostHandler = (e) => {
        if(!localStorage.getItem("accessToken")){
            alert("로그인을 먼저 해주세요!")
        }else{
            history.push({
                pathname: "/PLEA-STREET/postwrite",
                state: {
                    token: localStorage.getItem("accessToken")
                }
            })
        }
    }

    //로그인 핸들러
    const SignInHandler = (e) => {
        history.push({
            pathname: "/PLEA-STREET/signin"
        })
    }

    //회원가입핸들러
    const SignUpHandler = (e) => {
        history.push({
            pathname: "/PLEA-STREET/signup"
        })
    }

    return (
        <Wrapper>
            <MenuBar/>
                <PostListWrap> 
                <Top>
                   {notlogged ? <Button size ='huge' basic color ='blue' onClick={SignInHandler}>로그인</Button> : null }
                    <Button size ='huge' basic color ='blue' onClick={PostHandler}>글작성</Button>
                    {notlogged ? <Button size ='huge' basic color ='blue' onClick={SignUpHandler}>회원가입</Button>: null}
                </Top>
                <Body>
                    <PostList/>
                </Body>
            </PostListWrap>
        </Wrapper>
    )
}

export default CommunityPage
