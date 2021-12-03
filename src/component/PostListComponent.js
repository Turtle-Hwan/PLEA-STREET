import React,{useState, useRef, useEffect} from 'react'
import useFetch from "./PostComponent"
import styled from 'styled-components';
import { useHistory } from 'react-router';


const Wrapper = styled.div`
    width : 640px;
    background-color: #f2f2f2;
    padding-top: 1rem;
`

const Content = styled.div`
  padding: 1rem;
  margin: 1rem;
  height: 200px;
  width : 94%;
  border-bottom: 4px solid rgb(50, 84, 137, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover{
    cursor: pointer;
  }
`;

const Loading = styled.div`
  font-weight: 600;
`;

const ListTitle = styled.span`
    font-size : 2.0rem;
    padding-top: 1rem;
    font-weight: bold;
    overflow: hidden;
    cursor: pointer;
    padding-bottom:1em;
`

const ListContent = styled.div`
    /* padding-top: 5vh; */
    padding-top: 1.2rem;
    overflow: hidden;
    cursor: pointer;
`
const ListNum = styled.div`
  font-size: 1rem;
`
const ListWrite = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
`


function PostListComponent() {
  const [pageNum, setPageNum] = useState(0);
  const [boardId1, setBoardId1] = useState();
  const {list, hasMore, isLoading} = useFetch(pageNum);
  const history = useHistory();   

  const observerRef = useRef();
  const options = {
      root: null,
      rootMargin:"10px",
      threshold: 0
  }
  console.log("boardIdcompoennt ", boardId1)
  

  const pageHandler = (prop) => {
      setBoardId1(prop)
      console.log("prop",prop)
      history.push({
          pathname: "/PLEA-STREET/posted",
          state: {
              boardId: prop
          }
      })
  }


  const observer = (ele) => {
      if(isLoading) return;
      if(observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(([entry]) => {
          if(entry.isIntersecting && hasMore){
              setPageNum((page) => page + 1);
          }
      }, options);
      ele && observerRef.current.observe(ele);
  };

  console.log(list)

    return (
        <Wrapper>
            {list?.map((post, idx) =>(
                <Content 
                key={idx} 
                onClick={() => {
                            pageHandler(post.boardId);
                }}>        
                    <ListTitle>{post.boardTitle}</ListTitle>
                    <ListNum>{String(new Date().toLocaleDateString())}</ListNum>
                    <ListContent>{post.boardContent.replaceAll('<br/>','\r\n')}</ListContent>
                </Content>
            ))}
            <div ref ={observer}/>
            <div>{isLoading ? <Loading /> : "No More Data"} </div>
        </Wrapper>
    )
}

export default PostListComponent

