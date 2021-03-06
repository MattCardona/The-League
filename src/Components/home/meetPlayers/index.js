import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/misc.js';
import { Reveal } from 'react-reveal';
import HomeCards from './Cards.js';

class MeetPlayers extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    return (
      <Reveal
        fraction={0.4}
        onReveal={() => {
          this.setState((prevState) => ({show: true}))
        }}
      >
        <div className="home_meetplayers" style={{background: `#903749 url(${Stripes})`}}>
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={this.state.show}/>
              </div>
              <div className="home_text_wrapper">

                <div className="tag-div">
                  <Tag
                    id="tag_id"
                    bck="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}
                  >
                    Meet
                  </Tag>
                </div>
                <div className="tag-div">
                  <Tag
                    id="tag_id"
                    bck="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}
                  >
                    The
                  </Tag>
                </div>
                <div className="tag-div">
                  <Tag
                    id="tag_id"
                    bck="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px',
                    }}
                  >
                    Players
                  </Tag>
                </div>
                <div>
                  <Tag
                    bck="#fff"
                    size="27px"
                    color="black"
                    link={true}
                    linkTo="/the_team"
                    add={{
                      display: 'inline-block',
                      marginBottom: '27px',
                      border: '1px solid #0e1731'
                    }}
                  >
                    Meet them here
                  </Tag>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Reveal>
    )
  }
};

export default MeetPlayers;