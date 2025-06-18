import React, {useState} from 'react';
//함수형 컴포넌트의 정의
//컴포넌트의 이름을 정의할 때 대문자로 시작한다.
//let props = {name:"John"}
//props = {name:"홍길동"}
//let {name} = props;
export function Greeting({name="김철수"}) {
// JSX문법으로 HTML조각을 반환할 수 있다.
  return <h1>Hello,{name}!</h1>;
//<div>
//  하나의 루트요소만 반환할 수 있다.
//  여러 요소를 반환할 때는 반드시 하나의 요소로 감싸야 한다.
//  <h1>Hello, {name}!</h1>;
//  <h2>bye, {props.name}!</h2>;
//</div>
}

//props는 읽기전용이다. 수정 할 수 없다.
//props = {name:"홍길동"}
//데이터가 props로 넘어오면 {}는 무시하고 {name:"홍길동"}으로 된다.
export function Farewell(props = {}){

    //props에 값이 들어있으면 김철수는 무시하고 홍길동이 들어간다.
    //구조분해 할당에서 =은 대입연산자의 역할이 아니라 기본값을 표기하는 역할
    //{x = y} x에 값이 없으면 y를 넣는다는 조건부 대입
    const {name = "김철수"} = props;
    //기본적으로 props로 넘어온 데이터들은 읽기 전용이지만
    //수정하고 싶다면 state를 이용해서 바꾸면 된다.
    //const [name, setName] = useState(props.name);

    return (
      <div>
        <h1>Goodbye, {name} </h1>
        {/* <button onClick={() => setName("박길동")}>Change Name</button> */}
      </div>
    )
}