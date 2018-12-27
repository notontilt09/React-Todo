import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import './App.css'


class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
    this.state = {
      todo:  localStorage.getItem('todo') === null ? [] : JSON.parse(localStorage.getItem('todo')),
      inputText: '',
      searchText: ''
    };
  };

  updateNumbers = () => {
    this.setState(
      prevState => ({todo: prevState.todo.map(task => {
        return {...task, number: prevState.todo.indexOf(task) + 1}})
      })
  )};

  handleChange = event => {
    this.setState({
      inputText: event.target.value
    });
  };

  handleSearch = event => {
    this.setState({
      searchText: event.target.value,
    });
    this.setState( 
        prevState => (
          {todo: localStorage.getItem('todo') === null ? [] : JSON.parse(localStorage.getItem('todo')).filter(task => task.task.toLowerCase().indexOf(prevState.searchText.toLowerCase()) > -1)}
        )
    );
    this.updateNumbers();
  };

  addTodo = event => {
    event.preventDefault();
    if (this.state.inputText !== '') {
      this.setState({
        todo: [...this.state.todo, {task: this.state.inputText, id: Date.now(), completed: false, number: this.state.todo.length + 1}],
        inputText: ''
      }, () => localStorage.setItem('todo', JSON.stringify(this.state.todo)));
    };
  };

  toggleCompleted = id => {
    this.setState({
      todo: this.state.todo.map(task => {
        if (task.id === id) {
          return {
            ...task,
          completed: !task.completed ? true : false
          };
        } else {
          return task;
        }
      })
    }, () => localStorage.setItem('todo', JSON.stringify(this.state.todo)));
  };

  clearCompleted = event => {
    event.preventDefault();
    // ***** Need to fix this so invoking clearCompleted with the button does
    // ***** not remove all filtered items, just items that are completed
    this.setState({
      todo: this.state.todo.filter(task => !task.completed)
    }, () => localStorage.setItem('todo', JSON.stringify(this.state.todo)))
    this.updateNumbers();
  }

  render() {
    return (
      <div className="App">
        <TodoForm 
        inputText={this.state.inputText} 
        handleChange={this.handleChange}
        addTodo={this.addTodo}
        clearCompleted={this.clearCompleted}
        handleSearch={this.handleSearch}
        searchText={this.searchText}
        />
        <TodoList list={this.state.todo} toggleCompleted={this.toggleCompleted}/>
      </div>
    );
  }
}

export default App;
