import React, { Component } from 'react'
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import PlayerCard from '../../ui/PlayerCard.js';

class HomeCards extends Component {
  constructor(props) {
    super(props);
    this.showAnimatedCards = this.showAnimatedCards.bind(this);
    this.state = {
      cards: [
        {
          bottom: 90,
          left: 300
        },
        {
          bottom: 60,
          left: 200
        },
        {
          bottom: 30,
          left: 100
        },
        {
          bottom: 0,
          left: 0
        }
      ]
    };
  }
  showAnimatedCards() {
    return (
      this.state.cards.map((card, index) => (
        <Animate
          key={index}
          show={this.props.show}
          start={{
            left: 0,
            bottom: 0
          }}
          enter={{
            left: [card.left],
            bottom: [card.bottom],
            timing: {duration: 500, ease: easePolyOut}
          }}
        >
          {({left, bottom}) => {
            return (
              <div
                style={{
                  position: 'absolute',
                  left,
                  bottom
                }}
              >
                <PlayerCard
                  number="30"
                  name="Nicolas"
                  lastname="Otamendi"
                  bck={Otamendi}
                />
              </div>
            )
          }}
        </Animate>
      ))
    )
  }
  render() {
    return (
      <div>
        {this.showAnimatedCards()}
      </div>
    )
  }
};


export default HomeCards;