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

  // each created todo will have a number attached to it for listing the todo's in order.  When
  // the state is changed and the numbers are no longer sequential, updateNumbers will set the state
  // of the numbers key to once again be sequential.  Thus todo's will always be listed starting at 1
  // and counting up to the length of the todo array.
  updateNumbers = () => {
    this.setState(
      prevState => ({todo: prevState.todo.map(task => {
        return {...task, number: prevState.todo.indexOf(task) + 1}})
      })
  )};

  // pass handleChange to add item form input to update inputText prop to whatever the user enters
  handleChange = event => {
    this.setState({
      inputText: event.target.value
    });
  };

  searchHelper = () => {
    const tasks = document.querySelectorAll('.task-item');
    const tasksArray = Array.from(tasks);
    const matching = tasksArray.filter(task => task.textContent.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1);
    console.log(matching);
  
  }

  // pass handleSearch to search items form input to filter the todo's matching search input
  handleSearch = event => {
    this.setState({
      searchText: event.target.value,
    }, () => { 
      this.filterSearch();
      this.updateNumbers();
    });
  };

  filterSearch = () => {
    const tasks = document.querySelectorAll('.task-item');
    const tasksArray = Array.from(tasks);
    tasksArray.forEach(task => {
      if (task.textContent.indexOf(this.state.searchText) === -1) {
        task.classList.add('hide');
      } else {
        task.classList.remove('hide');
      }
    })
  }

  // add a todo item to the TodoList component
  addTodo = event => {
    event.preventDefault();
    if (this.state.inputText !== '') {
      this.setState({
        todo: [...this.state.todo, {task: this.state.inputText, id: Date.now(), completed: false, number: this.state.todo.length + 1}],
        inputText: ''
      }, () => localStorage.setItem('todo', JSON.stringify(this.state.todo)));
    };
  };

  // allow user to click a task and change it's state.completed to the opposite boolean
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

  // remove all todo's from the state which have the completed key set to true
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
