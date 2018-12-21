import React, { Component } from 'react';
import { fireMatches } from '../../../firebase.js';
import { firebaseLooper, reverseArray } from '../../ui/misc.js';
import MatchesBlock from '../../ui/MatchesBlock.js';
import { Slide } from 'react-reveal';

class Blocks extends Component {
  constructor(props) {
    super(props);
    this.showMatches = this.showMatches.bind(this);
    this.state = {
      matches: []
    };
  }
  componentDidMount() {
    fireMatches.limitToLast(6).once('value').then((snapshot) => {
      const data = firebaseLooper(snapshot);
      const reverseData = reverseArray(data);
      this.setState(() => ({ matches: reverseData}));
    })
  }
  showMatches(matches) {
    if(matches.length > 1){
      return matches.map((match) => (
        <Slide bottom key={match.id}>
          <div className="item">
            <div className="wrapper">
              <MatchesBlock match={match} />
            </div>
          </div>
        </Slide>
      ))
    }else{
      return null;
    }
  }
  render() {
    return (
      <div className="home_matches">
        {this.showMatches(this.state.matches)}
      </div>
    )
  }
};

export default Blocks;