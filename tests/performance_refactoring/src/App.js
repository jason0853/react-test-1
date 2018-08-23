import React, { Component } from 'react';
import DirtyList from 'components/DirtyList';
import { toFloatingsInArray } from 'lib/num';
import './App.css';

const initialOrderbook = {
  buys: [],
  sells: []
};

let length;
let rotate = -10;

/*
 * setTimeout이나 setInterval을 사용하면 종종 프레임이 누락되어 버벅거리는 현상이 발생했었습니다.
 * requestAnimationFrame을 이용하면 자바스크립트가 프레임 시작시 누락되지 않고 실행되도록 보장합니다.
 */
window.requestAnimationFrame = (function() {
  return function(callback) {
    window.setTimeout(callback, 15);
  };
})();

class App extends Component {
  id = 0;

  state = {
    isRunning: false,
    orderbook: initialOrderbook,
    startDate: null
  };

  handleTestRunner = () => {
    const { isRunning } = this.state;

    if (isRunning) {
      this.setState(() => ({ isRunning: false }));
    } else {
      const startDate = new Date();
      this.setState(() => ({
        isRunning: true,
        startDate
      }));
    }
  };

  orderbookRunner = type => {
    this.setState(
      ({ orderbook }) => ({
        orderbook: {
          ...orderbook,
          [`${type}`]: [
            // javascript native Math api 사용해서 처리했습니다.(num.js 참조)
            ...orderbook[type].slice(Math.round(Math.random())),
            {
              id: this.id++, // 키 값으로 사용하기 위해 unique id 값 부여
              data: toFloatingsInArray()
            }
          ]
        }
      }),
      () =>
        this.state.isRunning &&
        requestAnimationFrame(() => this.orderbookRunner(type))
    );
  };

  // component를 호출하고 난 뒤 업데이트가 일어난 이후 로직
  componentDidUpdate(prevProps, prevState) {
    const { orderbook, startDate } = this.state;
    const { buys, sells } = orderbook;
    length = buys.length + sells.length;

    // false -> true 로 변경됐을 경우의 로직
    if (!prevState.isRunning && this.state.isRunning) {
      this.orderbookRunner('buys');
      this.orderbookRunner('sells');
    }

    if (length === 300) {
      const endDate = new Date();
      this.setState({
        isRunning: false,
        orderbook: initialOrderbook
      });
      alert(
        `Complete! Total time taken in milliseconds: ${endDate - startDate}`
      );
    }
  }

  render() {
    const { handleTestRunner } = this;
    const { isRunning, orderbook } = this.state;
    rotate += 10;

    return (
      <div className="App">
        <header className="App-header">
          <img
            style={{ transform: `rotate(${rotate}deg)` }}
            src="favicon.ico"
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title">Performance Testing</h1>
        </header>
        <div className="App-intro">
          <aside>
            <button onClick={handleTestRunner}>
              {' '}
              {!isRunning ? 'start' : 'stop'}{' '}
            </button>
            <div># of items: {length}</div>
          </aside>
          <DirtyList orderbook={orderbook} />
        </div>
      </div>
    );
  }
}

export default App;
