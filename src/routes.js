import React from 'react';
import { Switch } from 'react-router-dom';

import Layout from './Hoc/Layout.js';
import Home from './Components/home/index.js';
import SignIn from './Components/signin/index.js';
import Dashboard from './Components/admin/Dashboard.js';
import AdminMatches from './Components/admin/matches/index.js';
import AddEditMatch from './Components/admin/matches/AddEditMatch.js';

import PrivateRoutes from './Components/authRoutes/PrivateRoutes.js';
import PublicRoutes from './Components/authRoutes/PublicRoutes.js';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
         <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
         <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches} />
         <PrivateRoutes {...props} path="/admin_matches/edit_matches" exact component={AddEditMatch} />
         <PrivateRoutes {...props} path="/admin_matches/edit_matches/:id" exact component={AddEditMatch} />
         <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
         <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={SignIn} />
      </Switch>
    </Layout>
  )
};

export default Routes;
