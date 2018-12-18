import React from 'react';
import Header from '../Components/Header_footer/Header.js';
import Footer from '../Components/Header_footer/Footer.js';

const Layout = (props) => {
  return (
    <div>
      <Header />
      
      {props.children}

      <Footer />
    </div>
  )
};

export default Layout;
