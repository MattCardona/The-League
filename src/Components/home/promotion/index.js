import React from 'react';
import PromotionAnimation from './PromotionAnimation.js';
import Enroll from './Enroll.js';

const Promotion = () => {
  return (
    <div className="promotion_wrapper" style={{background: "#fff"}}>
      <div className="container">
        <PromotionAnimation /> 
        <Enroll />
      </div>
    </div>
  )
};

export default Promotion;