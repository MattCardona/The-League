import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/app.css';
import { BrowserRouter } from 'react-router-dom';

import { firebase } from './firebase.js';
import Routes from './routes';

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
  )
}

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})


// Todo: take this out
if(module.hot){
  module.hot.accept();
}