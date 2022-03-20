import React,{ useState,useRef,useEffect } from "react";
import styledComponents from "styled-components";
import { CheckBox } from "./checkbox";
import { useDispatch,useSelector } from "react-redux";
import { addTask } from "../actions/user";
import { NotificationManager } from 'react-notifications';

const TextInput = styledComponents.input`
border:none;
padding-left:1rem;
background-color:transparent;
font-size:1.2rem;
outline:none;
color:${({ mode,theme }) => mode ? theme.dark[ 1 ] : theme.light[ 4 ]}
`;

export const ListItemContainer = styledComponents.section`
display:flex;
align-items:center;
flex-wrap: wrap;
.details{
width:100%;
margin-top: .5rem;
color:${({ mode,theme }) => mode ? theme.dark[ 0 ] : theme.light[ 4 ]};
display:${({ visible }) => visible ? "block" : "none"}; 
}
.input-box{
  border: none;
  margin-top:.5rem;
  margin-left:auto;
  background:${({ theme }) => theme.gradiants.main};
  padding: .6rem;
  border-radius: .2rem;
  color: white;
  outline:none;
}
.dateTime{ 
}
.duration{
  width:3rem;
  -moz-appearance: textfield;
}
button{
  margin-left:auto;
}
`;

export const Button = styledComponents.button`
  border: none;
  background: ${({ theme }) => theme.gradiants.main};
  border-radius: .2rem;
  padding: 10px 10px;
  color: white;
  cursor:pointer;
  `

const Input = React.forwardRef((props,ref) => {
  const user = useSelector((state) => state.user);
  const text = useRef();
  const date = useRef();
  const duration = useRef();
  const dispatch = useDispatch()
  const [ rem,setRem ] = useState(false);

  useEffect(() => {
    const func = (event) => {
      if (event.key === "Enter") {
        add()
      }
    };
    document.addEventListener("keypress",func);
    return () => {
      document.removeEventListener("keypress",func);
    };
  },[]);

  const add = () => {
    if (text.current.value === "") {
      NotificationManager.error("please give a title",'Alert',1000);
      return
    }
    const tempDate = new Date();
    const task = { text: text.current.value,dateTime: date.current ? date.current.value || tempDate.getTime() : tempDate.getTime(),active: true,duration: duration.current.value || "0" }
    const temp1 = new Date(tempDate.toISOString())
    const temp2 = new Date(task.dateTime)

    dispatch(addTask(user.email,task))
  }

  return (
    <ListItemContainer visible={rem}>
      <CheckBox onClick={() => setRem(!rem)} active={!rem} mode={props.mode} />
      <TextInput
        type="text"
        ref={text}
        mode={props.mode}
        placeholder="Create a new todo..."
      />
      <Button name="add" id="add" onClick={add} >add</Button>
      <div className={`details`}>
        <div>
          <label htmlFor="targetFinish">Target time : </label>
          <input id="targetFinish" className="input-box dateTime" type="datetime-local" ref={date}></input>
        </div>
        <div>
          <label htmlFor="workTime">Time required : </label>
          <input id="worktime" className="input-box duration" type="number" min={0} max={1440} ref={duration}></input>
          <span> min</span>
        </div>

      </div >
    </ListItemContainer >
  );
});

export default Input;
