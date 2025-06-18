import { useState } from "react";
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'

//ListItemSecondaryAction
//ListItem : 내부에서 텍스트나 아이콘 이후에 보조 액션 영역을 오른쪽 끝에 고정배치해준다.
//반드시 ListItem의 자식으로만 사용해야한다.

//IconButton
//아이콘을 클릭 가능한 버튼으로 만들어주는 컴포넌트이다.

//DeleteOutlined
//MUI 아이콘 라이브러리에 포함된 휴지통 아이콘 컴포넌트이다.

//현재 파일에서는 checkBox와 label 컴포넌트를 만들어보자
// export function Todo(){}
let Todo = (props) => {

    const editItem = props.editItem;

    //App.js에서 받은 한 가지 할일 목록
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);

    //true -> false로 바꾸는 turnOffReadOnly함수 추가
    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    const turnOnReadOnly = (e) => {
        if(e.key === "Enter" && readOnly === false){
            setReadOnly(true); //읽기만 허용
            editItem(item);
        }
    }

    //변경을 감지하는 함수
    // const handleChange = (e) => {
    //     setItem({
    //         ...item,
    //         title: e.target.value
    //     })
    // }

    const editEventHandler = (e) => {
        setItem({...item, title:e.target.value})
    }

    //체크박스 변경함수
    const checkBoxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem(item);
    }


    //삭제함수
    const deleteItem = props.deleteItem;
    
    const deleteEventHandler = () => {
        deleteItem(item);
    }

    return(
        //html코드가 들어가는 부분
        //속성을 쓸 때 카멜케이스로 작성한다.
        //onclick -> onClick
        //classname -> className
        <ListItem>
            <Checkbox checked={item.done} onChange={checkBoxEventHandler}/>
            {/* label태그는 for속성에 name값으로 연결해서 어떤 요소와 연결될 지 지정 */}
            <ListItemText>
                <InputBase 
                    inputProps={{"aria-label" : "naked", readOnly : readOnly}}
                    onClick={turnOffReadOnly}
                    onChange={editEventHandler}
                    onKeyDown={turnOnReadOnly}
                    type = "text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true} />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label='Delete Todo' onClick={deleteEventHandler}> {/* 휴지통 버튼 */}
                    <DeleteOutlined /> {/* 휴지통 아이콘 */}
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Todo;

//Todo 프로그램 만들기
//다양한 내용의 할일을 추가하는것
//임의의 Todo리스트는 각 Todo마다 다른 내용을 갖고 있어야한다.
//이 요구사항을 충족하기 위해 Todo 컴포넌트에 title을 매개변수로 넘기자

// Todo 삭제하기
// 각 리스트 아이템의 오른쪽에 삭제 버튼을 추가
// 삭제 버튼을 누르면 아이템을 삭제하는 기능 추가하기

// Todo의 수정
// 1. 체크박스 클릭시 done을 true 또는 false로 바꾼다.
// 2. title을 변경을 하는 것
// ㄴ 사용자가 title을 누르면 수정 가능한 상태가 되게 만들고
// 사용자가 수정을 하고 enter키를 누르면 수정 내용을 저장