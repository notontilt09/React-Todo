import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import LeftToDo from './components/TodoComponents/LeftToDo'
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

  // pass handleSearch to search items form input to filter the todo's matching search input
  handleSearch = event => {
    this.setState({
      searchText: event.target.value,
    }, () => { 
      this.filterSearch();
      this.updateNumbers();
    });
  };

  // filterSearch method to hide or show task items if the contain the user search input
  filterSearch = () => {
    // grab all tasks
    const tasks = document.querySelectorAll('.task-item');
    // turn nodeList into array to used array methods
    const tasksArray = Array.from(tasks);
    // loop through tasks and add 'hide' class if they don't contain user searchText
    // remove that class if they were previously hidden, but contain current searchText
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
        todo: [...this.state.todo, {
          task: this.state.inputText, 
          id: Date.now(), 
          completed: false, 
          number: this.state.todo.length + 1,
          editing: false
        }
        ],
        inputText: ''
      }, () => localStorage.setItem('todo', JSON.stringify(this.state.todo)));
    };
  };

  // remove all todo's from the state which have the completed key set to true
  clearCompleted = event => {
    event.preventDefault();
    this.setState({
      todo: this.state.todo.filter(task => !task.completed)
    }, () => localStorage.setItem('todo', JSON.stringify(this.state.todo)))
    this.updateNumbers();
  }

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

  removeTodo = id => {
    const todo = this.state.todo.filter(todo => todo.id !== id);
    this.setState({
      todo: todo
    },() => {
      localStorage.setItem('todo', JSON.stringify(this.state.todo));
      this.updateNumbers()
  })
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
        <TodoList 
          todo={this.state.todo} 
          toggleCompleted={this.toggleCompleted}
          removeTodo={this.removeTodo}
        />
        <LeftToDo todo={this.state.todo}/>
      </div>
    );
  }
}

export default App;
