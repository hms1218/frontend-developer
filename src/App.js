import {useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
//경로는 현재파일을
import Todo from './Todo';
import AddTodo from './AddTodo';
import {AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography} from '@mui/material';
//import axios from 'axios';
import {call, signout} from './service/ApiService'

//Container
//레이아웃의 가로 폭을 제한하고, 중앙 정렬 및 기본 패딩을 자동으로 적용해주는 컴포넌트

//주요 props
//maxWidth : 최대 너비를 지정(xs,sm,md,lg,xl,false)
//fixed : maxWidth와 관계없이 항상 고정폭 적용

function App() {
  //하나의 할 일을 객체로 관리할 것이다.
  //id, title, done  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //최초 렌더링 시 1번만 실행
  useEffect(() => {
    //조회하기
    call("/todo","GET")
      .then(result => {
        setItems(result.data)
        setLoading(false)
      })
  },[]);
  
  //추가하기
  const add = (item) => {
    //데이터베이스에 추가하기 위해 백엔드로 데이터를 전달
    call("/todo","POST",item)
    //데이터를 추가하고, 전체 데이터를 반환받아서 state에 세팅을 하여
    //다시 렌더링이 일어난다.
      .then(result => setItems(result.data))
  }

  //삭제를 해주는 deleteItem()함수 만들기
  //DELETE FROM TABLE WHERE ID=0;
  const deleteItem = (item) => {
    call("/todo","DELETE",item)
      .then(result => setItems(result.data))
  }

  //수정
  //타이틀 변경을 위해 input의 필드에서 사용자가 입력을 받아올 때
  //editEventHandler()에서 item을 바로 넘겨버리면 한글자씩 입력할 때마다 HTTP요청을 보내게 된다.
  //-> 이는 비효율적이기 때문에 수정을 완료한 시점에서 HTTP 요청을 보내고싶다.
  //-> 입력이 끝나서 수정이 불가능한 상태로 바뀌는 시점
  const editItem = (item) => {
    call("/todo","PUT",item)
      .then(result => setItems(result.data))
  }

  //상태를 변화시키는 함수를 호출하면 state의 변경사항이 화면에 적용이된다.
  

  //react는 key속성에 들어있는 값을 참고해서, 리스트의 요소가 변경될 경우
  //어떤 요소가 변경되었는지 빠르게 파악할 수 있다.
  const todoItems = items?.length > 0 && 
    //Paper컴포넌트
    //종이 같은 표면 효과를 제공하는 컨테이너 컴포넌트
    //elevation(그림자 깊이)를 통해 높낮이를 표현하고
    //배경색과 그림자 효과로 콘텐츠를 돋보이게 한다.
    <Paper style={{margin: 16}}>
      <List> {/*일련의 항목을 세로로 나열하는 컨테이너 역할*/}
        {items.map((item) => (
          <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem}/>
          ))}
      </List>
    </Paper>

    //네비게이션 바
    let navigationBar = (
      <AppBar position='static'>
        <Toolbar>
          <Grid justifyContent="space-between" container sx={{flexGrow: 1}}>
            <Grid item>
              <Typography variant='h6'>오늘의 할 일</Typography>
            </Grid>
            <Grid item>
              <Button color='inherit' raised onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )

  //로딩중이 아닐 때 렌더링할 부분
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo add={add}/> {/* AddTodo에 add함수를 전달 {add : function add(item) { }*/}
        <div className='TodoList'>
          {todoItems}
        </div>
      </Container>
      {/* <Todo item={item2}/> */}
      {/*컴포넌트의 호출 <컴포넌트명 /> */}
    </div>
  )

  //로딩중일 때 렌더링할 부분
  let loadingPage = <h1>로딩중...</h1>
  let content = loadingPage;

  if(!loading){
    content = todoListPage;
  }
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;

//1. Todo를 하나 더 만들어 item을 하나 더 넘겨보자
//id = '1' , title = "Hello world 2" , done = false

//2. Todo를 두 개 연속으로 늘어 놓는 대신, 배열과 반복문을 이용해보자
//반복문으로 생성된 Todo컴포넌트들을 어떻게 넘길것인가?


//useState(), 기능을 하는 함수를 App.js에 만든 이유?
//전체 Todo리스트는 App.js에서 관리를 하기 때문에