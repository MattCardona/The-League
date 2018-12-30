import React from 'react';
import Featured from './featured/index.js';
import MatchesHome from './matches/index.js';
import MeetPlayers from './meetPlayers/index.js';
import Promotion from './promotion/index.js';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
      <Promotion />
    </div>
  )
};

export default Home;
