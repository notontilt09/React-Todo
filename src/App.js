import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import './App.css'

const todoData = [];

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
    this.state = {
      todo: todoData,
      inputText: '',
      searchText: ''
    };
  };

  updateNumbers = () => {
    this.setState(
      prevState => ({todo: prevState.todo.map(task => {
        return {...task, number: prevState.todo.indexOf(task) + 1}})
      })
  )}

  handleChange = event => {
    this.setState({
      inputText: event.target.value
    });
  };

  handleSearch = event => {
    this.setState({
      searchText: event.target.value,
    });
    this.filterTasks();
  }

  filterTasks = () => {
    this.setState( 
      prevState => ({todo: prevState.todo.filter(task => task.task.indexOf(prevState.searchText) > -1)})
    )
    this.updateNumbers();
  }

  addTodo = event => {
    event.preventDefault();
    if (this.state.inputText) {
      this.setState({
        todo: [...this.state.todo, {task: this.state.inputText, id: Date.now(), completed: false, number: this.state.todo.length + 1}],
        inputText: ''
      });
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
    });
  };

  clearCompleted = event => {
    event.preventDefault();
    this.setState(
      prevState => ({todo: prevState.todo.filter(task => !task.completed)})
    )
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
