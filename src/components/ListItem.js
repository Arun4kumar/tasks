import React,{ useState } from "react";
import styledComponents from "styled-components";
import { CheckBox } from "./checkbox";
import Moment from 'react-moment';
import { NotificationManager } from 'react-notifications';

const Container = styledComponents.div`
  display:flex;
  align-items:center;
  padding:1rem 1.5rem;
  h1{
      margin-left:1rem;
      color:${({ active,theme,mode }) => (!active ? mode ? theme.dark[ 2 ] : theme.light[ 1 ] : mode ? theme.dark[ 1 ] : theme.light[ 4 ])};
        text-decoration-line: ${({ active }) =>
    !active ? `line-through` : `none`}
  }
img{
  height: .9rem;
  cursor: pointer;
    
}
.info{
  margin-left:auto;
  display:flex;
  align-items:center;
  gap:.5rem;
  color: ${({ theme,mode }) => mode ? theme.dark[ 2 ] : theme.light[ 2 ]};
}
border-bottom: 1px solid ${({ theme,mode }) => mode ? theme.dark[ 4 ] : theme.light[ 1 ]};
@media screen and(min-width: 500px) {
   .cross {
    display: none;
  }
   .cross:hover{
     display: block;
    }
}`;

const ListItem = ({ item,check,remove,mode }) => {
  const [ date,setDate ] = useState(item.dateTime);
  const curDate = new Date(date);
  let msgTime = curDate.getTime() - (Number(item.duration) * 60);
  msgTime = new Date(msgTime);
  const cur = new Date();
  const notTime = Math.abs(msgTime.getTime() - cur.getTime())

  if (item.active == true) {
    if (msgTime > new Date()) {
      setTimeout(() => {
        NotificationManager.info('You should start ' + item.text + " now.",'Remainder',2000);
        console.log("notified - " + item.text)
      },notTime)
    }
    else {
      NotificationManager.info('You should start ' + item.text + " now.",'Remainder',2000);
      console.log("notified - " + item.text)
    }
  }

  return (
    <Container mode={mode} active={item.active}>
      <CheckBox
        mode={mode}
        onClick={() => check(item.id,item.active)}
        active={item.active}>
        {!item.active && <img style={{ height: '.6rem' }} src="./images/icon-check.svg" />}
      </CheckBox>
      <h1>{item.text}</h1>
      <div className="info">
        {msgTime > new Date() && <><Moment className="test" format="hh:mm:ss" durationFromNow>
          {msgTime}
        </Moment> <p>left</p></>}
        <img className="cross" onClick={() => remove(item.id)} src="./images/icon-cross.svg" />
      </div>
    </Container>
  );
}

export default ListItem;
