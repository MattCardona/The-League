import React from 'react';
import { Link } from 'react-router-dom';  
import { ListItem } from '@material-ui/core';
import { firebase } from '../../../firebase.js';

const AdminNav = () => {
  const links = [
    {
      title: 'Matches',
      linkTo: '/admin_matches'
    },
    {
      title: 'Add Match',
      linkTo: '/admin_matches/edit_match'
    },
    {
      title: 'Players',
      linkTo: '/admin_players'
    },
    {
      title: 'Add Player',
      linkTo: '/admin_players/add_player'
    }
  ]
  const styles = {
    color: '#fff',
    fontWeight: '300',
    borderBottom: '1px solid #353535'
  }
  const renderItems = () => (
    links.map((link) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={styles}> 
          {link.title}
        </ListItem>
      </Link>
    ))
  )
  const logoutHandler = () => {
    firebase.auth().signOut().then(() => {
      console.log("You logged out")
    }).catch((err) => {
      console.log("There was a error on logout")
    })
  }
  return (
    <div>
      {renderItems()}  
      <ListItem 
        button 
        style={styles}
        onClick={() => logoutHandler()}  
      >
        Logout  
      </ListItem>   
    </div>
  )
};

export default AdminNav;