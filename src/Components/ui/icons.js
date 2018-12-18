import React from 'react';
import { Link } from 'react-router-dom';

import manchesterLogo from '../../Resources/images/logos/manchester_city_logo.png';

const CityLogo = (props) => {
  const temp = <div
    className="img_cover"
    style={{
      width: props.width,
      height: props.height,
      background: `url(${manchesterLogo}) no-repeat`
    }}
  >
  </div>;
  if(props.link){
    return (
      <Link to={props.linkTo} className="link_logo">
        {temp}
      </Link>
    )
  }else{
    return temp;
  }
};

export default CityLogo;
