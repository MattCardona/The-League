import React from 'react';
import Layout from './Hoc/Layout.js';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/home/index.js';
import SignIn from './Components/signin/index.js';
import Dashboard from './Components/admin/Dashboard.js';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
         <Route exact component={Dashboard} path="/dashboard" />
         <Route exact component={Home} path="/" />
         <Route exact component={SignIn} path="/sign_in" />
      </Switch>
    </Layout>
  )
};

export default Routes;
