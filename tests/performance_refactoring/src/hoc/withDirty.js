import React, { Component } from 'react';
import { toFloating } from 'lib/num';
import './dirty.css';

/**
 * HOC (High Order Component) - 공통되는 로직이나 재사용 가능한 컴포넌트
 * @param {String} type
 * @param {String} arr
 */
const withDirty = (type, arr) => {
  return class extends Component {
    /**
     * Virtual DOM에 렌더링되는 resource를 아끼기 위하여
     * 이전 props와 현재 props의 배열이 같지 않을 때 true 설정 -> render() 함수 호출
     * false 라면 -> render() 함수 호출 안됨!
     */
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps[arr] !== this.props[arr];
    }

    render() {
      return (
        <li className={`Orderbook__item Orderbook__item--${type}`}>
          <span> {this.props[arr][0]} </span>{' '}
          <span> {this.props[arr][1]} </span>
          <div
            style={{
              transform: `translateX(${toFloating()}%)`
            }}
          />
        </li>
      );
    }
  };
};

export default withDirty;
