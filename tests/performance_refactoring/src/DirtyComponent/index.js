import React, { Component } from 'react';
import Chance from 'chance'

import './dirtyComponent.css';

const chance = new Chance();

class DirtyComponent extends Component {
  render() {
    const { orderbook } = this.props;
    return (
      <section className='Dirty__Container'>
        <aside className='Dirty__Sub'>
          <div className='Dirty__Flex'>
            {
              orderbook
                .buys
                .sort((a, b) => a[0] - b[0])
                .map(buyArr => (
                  <li className='Orderbook__item Orderbook__item--buys'>
                    <span> {buyArr[0]} </span>
                    <span> {buyArr[1]} </span>
                    <div style={{ transform: `translateX(${chance.floating({ min: 1, max: 100, fixed: 4 })}%)`}}/>
                  </li>
                ))
            }
          </div>
          <div className='Dirty__Flex'>
            {
              orderbook
                .sells
                .sort((a, b) => a[0] - b[0])
                .map(sellArr => (
                  <li className='Orderbook__item Orderbook__item--sells'>
                    <span> {sellArr[0]} </span>
                    <span> {sellArr[1]} </span>
                    <div style={{ transform: `translateX(${chance.floating({ min: 1, max: 100, fixed: 4 })}%)` }}/>
                  </li>
                ))
            }
          </div>
        </aside>
      </section>
    );
  }
}

export default DirtyComponent;
