import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

  render() {
    const { amount, checked, memo, coin, krw, id, onRemove, select } = this.props;

    return (
      <div className="todo-item">
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        <div className={`currency`}>
          { coin }
        </div>
        <div className={`todo-text`}>
          <div>{amount}</div>
          <small>{krw}KRW</small>
        </div>
        <div className={`memo`} >
          {/* New feature Memo goes in here! */}
          { memo } 
        </div>
      </div>
    );
  }
}

export default TodoItem;