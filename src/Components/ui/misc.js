import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = (props) => {
  const temp = <div
    style={{
      ...props.add,
      background: props.bck,
      color: props.color,
      fontSize: props.size,
      padding: '5px 10px',
      display: 'inline-block',
      fontFamily: 'Righteous',
      marginLeft: '26px'
    }}
    id={props.id}
  >{props.children}</div>

  if(props.link){
    return (
      <Link to={props.linkTo}>
        {temp}
      </Link>
    )
  }else{
    return temp;
  }
};

export const firebaseLooper = (snapshot) => {
  const data = [];
  snapshot.forEach((childSnapShot) => {
    data.push({
      ...childSnapShot.val(),
      id: childSnapShot.key
    })
  })
  return data;  
};

export const reverseArray = (arr) => {
  let reversedArray = [];
  for(let i = arr.length-1; i >= 0; i--){
    reversedArray.push(arr[i]);
  }
  return reversedArray;
}