import React from 'react';
import Featured from './featured/index.js';
import MatchesHome from './matches/index.js';
import MeetPlayers from './meetPlayers/index.js';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
    </div>
  )
};

export default Home;
