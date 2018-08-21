import React from 'react';
import './KRWValue.css';

//Assignment 3 총 원화 환산 가치

const KRWValue = ({value}) => {
  return (
    <div className='krw-container' >
      총 원화 합산 가치: {value}KRW
    </div>
  )
}

export default KRWValue;