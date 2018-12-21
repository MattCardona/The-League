import React from 'react';
import Featured from './featured/index.js';
import MatchesHome from './matches/index.js';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
    </div>
  )
};

export default Home;
