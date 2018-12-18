import React, { Component } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CityLogo from '../ui/icons.js';

class Header extends Component {
  render() {
    return (
      <AppBar
        position='fixed'
        style={{
          backgroundColor: '#00adb5',
          boxShadow: 'none',
          padding: '12px 0',
          borderBottom: '2.7px solid #393e46'
        }}
      >
        <Toolbar
          style={{display: 'flex'}}
        >
          <div style={{flexGrow: 1}}>
            <div className="header_logo">
              <CityLogo 
                link={true}
                linkTo="/"
                width="70px"
                height="70px"
              />
            </div>
          </div>
          <Link to="/the_team">
            <Button color='inherit'>The Team</Button>
          </Link>
          <Link to="/the_matches">
            <Button color='inherit'>Matches</Button>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
};

export default Header;