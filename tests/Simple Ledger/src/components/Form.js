import React from 'react';
import './Form.css';

const Form = ({value, select, show, handleDropdown, handleSelect, onChange, onCreate, onKeyPress}) => {
  return (
    <div className="form">
      <div className='custom-select'>
        <div onClick={handleDropdown} className='header'>
          { select }
        </div>
        <div className={`select-children ${show ? 'active' : ''}`}>
          <div onClick={() => handleSelect('BTC')}>BTC</div>
          <div onClick={() => handleSelect('LTC')}>LTC</div>
          <div onClick={() => handleSelect('ETH')}>ETH</div>
        </div>
      </div>
      <input placeholder='수량 입력' value={value} onChange={onChange} onKeyPress={onKeyPress}/>
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default Form;