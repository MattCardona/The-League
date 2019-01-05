import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout.js';
import { fireMatches, firebase } from '../../../firebase.js';
import { firebaseLooper, reverseArray } from '../../ui/misc.js';

import { Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@material-ui/core';

// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

class AdminMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: []
    }
  }
  componentDidMount() {
    fireMatches.once('value').then(snapshot => {
      const matches = firebaseLooper(snapshot);
      
      this.setState(() => ({
        isLoading: false,
        matches: reverseArray(matches)
      }))
    })
  }
  render(){
    return (
      <AdminLayout>
        <div className="admin_progress">
          {this.state.isLoading ? 
            <CircularProgress thickness={5.5}
              style={{color: "#903749"}}

            />
            : ''
          }
        </div>
      </AdminLayout>
    )
  }
};

export default AdminMatches;
