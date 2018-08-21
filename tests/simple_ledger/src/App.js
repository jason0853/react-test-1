import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import { v1 as UUID } from 'uuid';


class App extends Component {

  state = {
    input: '',
    select: '코인 선택',
    memo: '',
    show: false,
    todos: [
      { id: UUID(), coin: 'BTC', krw: '100,000', amount: '100', memo: '메모 입력칸', checked: false }
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input, todos, select, krw } = this.state;
    if(select !== '코인 선택' && input !== ''){ 
      this.setState({
        input: '',
        todos: todos.concat({
          id: UUID(),
          coin: select,
          krw,
          amount: input,
          checked: false,
          //memo (Needs to be Implemented) Assignment 6
        }),
        select: '코인 선택'
      });
    } else {
      if (select === '코인 선택'){
        alert('코인을 먼저 선택해주세요');
      } else {
        alert('수량을 입력해주세요');
      }
    }
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleDropdown = () => {
    this.setState({ show: !this.state.show });
  }

  handleSelect = (coin) => {
    this.setState({ select: coin, show: false });
  }

  render() {
    const { input, todos, select, show } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleRemove,
      handleSelect,
      handleDropdown
    } = this;
    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          show={show}
          select={select}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          handleDropdown={handleDropdown}
          handleSelect={handleSelect}
        />
      )}>
        <TodoItemList todos={todos} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
