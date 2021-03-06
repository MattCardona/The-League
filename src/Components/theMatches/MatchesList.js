import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import { NodeGroup } from 'react-move';


class MatchesList extends Component {
  constructor(props){
    super(props);
    this.showMatches = this.showMatches.bind(this);
    this.state = {
      matchlist: []
    }
  }
  static getDerivedStateFromProps(props, state){
    return state = {
      matchlist: props.matches
    }
  }
  showMatches(){
    return (
      this.state.matchlist ? 
        <NodeGroup
          data={this.state.matchlist}
          keyAccessor={(d) => d.id }
          start={() => ({
            opacity: 0,
            x: -200
          })}
          enter={(d,i) => ({
            opacity: [1],
            x: [0],
            timing: {duration: 500, delay: i * 50, ease: easePolyOut}
          })}
          update={(d,i) => ({
            opacity: [1],
            x: [0],
            timing: {duration: 500, delay: i * 50, ease: easePolyOut}
          })}
          leave={(d,i) => ({
            opacity: [0],
            x: [-200],
            timing: {duration: 500, delay: i * 50, ease: easePolyOut}
          })}
        >
          {(nodes) => (
            <div>
              { nodes.map(({key, data, state:{x, opacity}}) => (
                <div 
                  key={key} 
                  className="match_box_big"
                  style={{
                    opacity,
                    transform: `translate(${x}px)`
                  }}  
                >
                  <div className="block_wrapper">

                    <div className="block">
                      <div className="icon"
                        style={{
                          background: `url(/images/team_icons/${data.localThmb}.png`
                        }}
                      ></div>
                      <div className="team">{data.local}</div>
                      <div className="result">{data.resultLocal}</div>
                    </div>

                    <div className="block">
                      <div className="icon"
                        style={{
                          background: `url(/images/team_icons/${data.awayThmb}.png`
                        }}
                      ></div>
                      <div className="team">{data.away}</div>
                      <div className="result">{data.resultAway}</div>
                    </div>

                  </div>

                  <div className="block_wrapper info">
                    <div><strong>Date</strong>{data.date}</div>
                    <div><strong>Stadium</strong>{data.stadium}</div>
                    <div><strong>Referee</strong>{data.referee}</div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </NodeGroup>
      :null
    )
  }
  render() {
    // console.log(this.state.matchlist)
    return (
      <div>
        {this.showMatches()}
      </div>
    )
  }
};

export default MatchesList;