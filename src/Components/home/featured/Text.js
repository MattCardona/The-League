import React from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';
import FeaturedPlayer from '../../../Resources/images/featured_player.png'

class Text extends React.Component {
  constructor(props){
    super(props);
    this.animateNumber = this.animateNumber.bind(this);
    this.animateFirst = this.animateFirst.bind(this);
    this.animateSecond = this.animateSecond.bind(this);
    this.animatePlayer = this.animatePlayer.bind(this);
  }
  animateNumber() {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          rotate: 0
        }}
        enter={{
          opacity: [1],
          rotate: [360],
          timing: {duration: 1000, ease: easePolyOut}
        }}
      >
        {({opacity, rotate}) => {
          return (
            <div className="featured_number"
              style={{
                opacity,
                transform: `translate(260px, 170px) rotateY(${rotate}deg)`
              }}
            >
              8
            </div>
          )
        }}
      </Animate>
    )
  }
  animateFirst() {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          x: 503,
          y: 450
        }}
        enter={{
          opacity: [1],
          x: [273],
          y: [450],
          timing: {duration: 500, ease: easePolyOut}
        }}
      >
        {({opacity, x, y}) => {
          return (
            <div className="featured_first"
              style={{
                opacity,
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              League
            </div>
          )
        }}
      </Animate>
    )
  }
  animateSecond() {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          x: 503,
          y: 586
        }}
        enter={{
          opacity: [1],
          x: [273],
          y: [586],
          timing: {duration: 500, ease: easePolyOut, delay: 340}
        }}
      >
        {({opacity, x, y}) => {
          return (
            <div className="featured_second"
              style={{
                opacity,
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              Championships
            </div>
          )
        }}
      </Animate>
    )
  }
  animatePlayer() {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0
        }}
        enter={{
          opacity: [1],
          timing: {duration: 500, ease: easePolyOut, delay: 780}
        }}
      >
        {({opacity}) => {
          return (
            <div className="featured_player"
              style={{
                opacity,
                transform: `translate(550px, 201px)`,
                background: `url(${FeaturedPlayer})`
              }}
            >
            </div>
          )
        }}
      </Animate>
    )
  }
  render() {
    return (
      <div className="featured_text">
        {this.animateNumber()}
        {this.animatePlayer()}
        {this.animateFirst()}
        {this.animateSecond()}
      </div>
    )
  }
};

export default Text;
