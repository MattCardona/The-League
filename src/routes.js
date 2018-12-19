import React from 'react';
import Layout from './Hoc/Layout.js';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/home/index.js';


const Routes = (props) => {
  return (
    <Layout>
      <Switch>
         <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  )
};

export default Routes;
