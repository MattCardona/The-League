import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';

class Stripes extends Component {
  constructor(props) {
    super(props);
    this.showStripes = this.showStripes.bind(this);
    this.state = {
      stripes: [
        {
          background: '#903749',
          left: 120,
          rotate: 25,
          top: -260,
          delay: 0,
          ids: 'first-stripe'
        },
        {
          background: '#fff',
          left: 360,
          rotate: 25,
          top: -397,
          delay: 200,
          ids: 'second-stripe'
        },
        {
          background: '#903749',
          left: 600,
          rotate: 25,
          top: -498,
          delay: 400,
          ids: 'third-stripe'
        }
      ]
    }
  }
  showStripes() {
    return (
      this.state.stripes.map((stripe, index) => (
        <Animate
          key={index}
          show={true}
          start={{
            background: '#fff',
            opacity: 0,
            left: 0,
            top: 0,
            rotate: 0
          }}
          enter={{
            background: [stripe.background],
            opacity: [1],
            left: [stripe.left],
            top: [stripe.top],
            rotate: [stripe.rotate],
            timing: {delay: stripe.delay, duration: 200, ease: easePolyOut}
          }}
        >
          {({background, opacity, left, rotate, top}) => {
            return (
              <div className="stripe"
                id={stripe.ids}
                style={{
                  background,
                  opacity,
                  transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
                }}
              >
              </div>
            );
          }}
        </Animate>
      ))
  )}
  render() {
    return (
      <div className="featured_stripes">
         {this.showStripes()}
      </div>
    )
  }
};

export default Stripes;