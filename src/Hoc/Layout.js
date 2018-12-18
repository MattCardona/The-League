import React from 'react';
import Header from '../Components/Header_footer/Header.js';

const Layout = (props) => {
  return (
    <div>
      <Header />
      
      {props.children}
    </div>
  )
};

export default Layout;
