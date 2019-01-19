import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import LeagueTable from './table.js';
import MatchesList from './MatchesList.js';
import { fireMatches } from '../../firebase.js';
import { firebaseLooper, reverseArray } from '../ui/misc.js';


class TheMatches extends Component {
  constructor(props){
    super(props);
    this.showPlayed = this.showPlayed.bind(this);
    this.state = {
      loading: true,
      matches: [],
      filterMatches: [],
      playedFilters: 'All',
      resultFilter: 'All'
    };
  }
  componentDidMount(){
    fireMatches.once('value').then((snapshot) => {
      const matches = firebaseLooper(snapshot);
      this.setState(() => ({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      }));
    })
  }
  showPlayed(op){
    const list = this.state.matches.filter((match) => {
      return match.final === op;
    });
    this.setState({
      filterMatches: op === 'All' ? this.state.matches : list,
      playedFilters: op,
      resultFilter: 'All'
    })
  }
  render() {
    const state = this.state;
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">
                  Show Match
                </div>
                <div className="cont">
                  <div className={`option ${state.playedFilters === 'All' ? 'active' : ''}`}
                    onClick={() => this.showPlayed('All')}
                  >
                    All
                  </div>
                  <div className={`option ${state.playedFilters === 'Yes' ? 'active' : ''}`}
                    onClick={() => this.showPlayed('Yes')}
                  >
                    Played
                  </div>
                  <div className={`option ${state.playedFilters === 'No' ? 'active' : ''}`}
                    onClick={() => this.showPlayed('No')}
                  >
                    Not Played
                  </div>
                </div>
              </div>
            </div>
            <MatchesList matches={state.filterMatches}/>
          </div>

          <div className="right">
            <LeagueTable />
          </div>

        </div>
      </div>
    )
  }
};

export default TheMatches;