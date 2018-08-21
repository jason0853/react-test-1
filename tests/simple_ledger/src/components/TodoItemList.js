import React, { Component } from 'react';
import TodoItem from './TodoItem';
import KRWValue from './KRWValue';

class TodoItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }
  
  render() {
    const { todos, onRemove } = this.props;
    
    //todos 배열을 map 해서 todo마다 <TodoItem/>를 만들고 포함된 todoList을 만드세요. 검색을 위한 filter()도 여기에 포함시켜도 됩니다.

    //ex) todos.map(todo => ...)

    return (
      <div>
        {todoList}  
        {todos.length === 0 ? null : 
          <div className='footer'>
            <input placeholder='원화 필터' />
            <KRWValue />
          </div>
        }
      </div>
    );
  }
}

export default TodoItemList;