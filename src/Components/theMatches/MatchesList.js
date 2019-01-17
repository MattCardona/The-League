import React, { Component } from 'react';

class MatchesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      matchlist: []
    }
  }
  static getDerivedStateFromProps(props, state){
    return state = {
      matchlist: props.matches
    }
  }
  render() {
    console.log(this.state.matchlist)
    return (
      <div>
        This will be the match list comp
      </div>
    )
  }
};

export default MatchesList;