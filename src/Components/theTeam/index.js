import React, { Component } from 'react';
import PlayerCard from '../ui/PlayerCard.js';
import { Fade } from 'react-reveal';
import Stripes from '../../Resources/images/stripes.png';
import { firebase, firebasePlayers } from '../../firebase.js';
import { firebaseLooper } from '../ui/misc.js';
import { Promise } from 'core-js';


class MeetTeam extends Component {
  constructor(props){
    super(props);
    this.showplayersByCategory = this.showplayersByCategory.bind(this);
    this.state = {
      loading: true,
      players: []
    }
  }
  componentDidMount(){
    firebasePlayers.once('value')
    .then((snapshot) => {
      const players = firebaseLooper(snapshot);
      let promise = [];

      for(let key in players){
        promise.push(
          new Promise((resolve, reject) => {
            firebase.storage().ref('players')
            .child(players[key].image).getDownloadURL()
            .then((url) => {
              players[key].url = url;
              resolve();
            })
          })
        )
      }
      Promise.all(promise).then(() => {
        this.setState({
          loading: false,
          players
        })
      })
    })
  }
  showplayersByCategory(category){
    return (
      this.state.players.map((player, i) => { 
        return player.position === category ?
          <Fade delay={i*20} left key={i}>
            <div className="item">
              <PlayerCard
                number={player.number}
                name={player.name}
                lastname={player.lastname}
                bck={player.url}
              />
            </div>
          </Fade>
        :null
      })
      :null
    )
  }
  render() {
    return (
      <div className="the_team_container" style={{ background: `#903749 url(${Stripes}) repeat`}}>
        { !this.state.loading ? 
            <div>

              <div className="team_category_wrapper">
                <div className="title">Keepers</div>
                <div className="team_cards">
                  {this.showplayersByCategory('Keeper')}
                </div>
              </div>

              <div className="team_category_wrapper">
                <div className="title">Defense</div>
                <div className="team_cards">
                  {this.showplayersByCategory('Defense')}
                </div>
              </div>

              <div className="team_category_wrapper">
                <div className="title">Mid-Field</div>
                <div className="team_cards">
                  {this.showplayersByCategory('Midfield')}
                </div>
              </div>

            </div>
          :null
        }
      </div>
    )
  }
};

export default MeetTeam;