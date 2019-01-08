import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout.js';
import { firebasePlayers } from '../../../firebase.js';
import { firebaseLooper, reverseArray } from '../../ui/misc.js';

import { Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@material-ui/core';

class AdminPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      players: []
    }
  }
  componentDidMount(){
    firebasePlayers.once('value').then((snapshot) => {
      const players = firebaseLooper(snapshot);

      this.setState((prevState) => ({
        isLoading: false,
        players: [...prevState.players, ...reverseArray(players)]
      }))
    })
  }
  render() {
    console.log(this.state);
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.players ? 
                  this.state.players.map((player, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Link to={`/admin_players/add_players/${player.id}`}>
                          {player.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin_players/add_players/${player.id}`}>
                          {player.lastname}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {player.number}
                      </TableCell>
                      <TableCell>
                        {player.position}
                      </TableCell>
                    </TableRow>
                  ))
                  : null
                }
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isLoading ? 
              <CircularProgress thickness={5.5}
                style={{color: "#903749"}}

              />
              : ''
            }
          </div>
        </div>
      </AdminLayout>
    )
  }
};

export default AdminPlayers;