import React from 'react';
import { Link } from 'react-router-dom';
import { element } from 'prop-types';

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

export const validate = (data) => {
  let error = [true, ''];

  if(data.validation.email){
    const valid = /\S+@\S+\.\S+/.test(data.value);
    const message = `${!valid ? 'Needs to be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if(data.validation.required){
    const valid = data.value.trim() !== '';
    const message = `${!valid ? 'Email field is required' : ''}`; 
    error = !valid ? [valid, message] : error;
  }
  return error;
};