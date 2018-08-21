import React, { Component } from 'react';
import Chance from 'chance';

import DirtyComponent from './DirtyComponent';

import './App.css';

const chance = new Chance();

const initialOrderbook = {
  buys: [],
  sells: [],
}

var length;
var rotate = -10;

class App extends Component {
  state = {
    isRunning: false,
    orderbook: initialOrderbook,
    startDate: null
  }

  handleTestRunner = this.handleTestRunner.bind(this);
  orderbookRunner = this.orderbookRunner.bind(this);

  handleTestRunner() {
    const { isRunning } = this.state;
    if (isRunning) {
      this.setState(() => ({ isRunning: false }));
    } else {
      let startDate = new Date();
      this.setState(
        () => ({ isRunning: true, orderbook: initialOrderbook, startDate }),
        () => {
          this.orderbookRunner('buys');
          this.orderbookRunner('sells');
        }
      );
    }
  }
  orderbookRunner(type) {
    this.setState(
      ({ orderbook }) => ({ 
        orderbook: {
          ...orderbook,
          [`${type}`]: [
            ...orderbook[type].slice(chance.integer({ min: 0, max: 1 })),
            [chance.floating({ min: 1, max: 100, fixed: 4 }), chance.floating({ min: 1, max: 100, fixed: 4 })],
          ]
        }
      }),
      () => this.state.isRunning && setTimeout(()=>this.orderbookRunner(type), 15)
    );
  }

  render() {
    const { isRunning, orderbook, startDate } = this.state;
    length = orderbook.buys.length + orderbook.sells.length;
    rotate += 10;
    if ( length === 300 ) {
      let endDate = new Date();
      this.setState({ isRunning: false, orderbook: initialOrderbook });
      alert(`Complete! Total time taken in milliseconds: ${endDate - startDate}`);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img style={{transform: `rotate(${rotate}deg)`}} src='favicon.ico' className='App-logo' alt='logo'/>
          <h1 className="App-title">Performance Testing</h1>
        </header>
        <p className="App-intro">
          <aside>
            <button onClick={() => this.handleTestRunner()}> { !isRunning ? 'start' : 'stop' } </button>
            <div># of items: {length}</div>
          </aside>
          <DirtyComponent 
            orderbook={orderbook}
          />
        </p>
      </div>
    );
  }
}

export default App;

