import React, { Component } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


class Header extends Component {
  render() {
    return (
      <AppBar
        position='fixed'
        style={{
          backgroundColor: '#226666',
          boxShadow: 'none',
          padding: '12px 0',
          borderBottom: '2.7px solid #f1b74e'
        }}
      >
        <Toolbar
          style={{display: 'flex'}}
        >
          <div style={{flexGrow: 1}}>
            <div className="header_logo">
              Logo
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