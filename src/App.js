import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'


const todoData = [
  {
    task: 'Laundry',
    id: Date.now(),
    completed: false
  },
  {
    task: 'Dishes',
    id: Date.now(),
    completed: false
  },
  {
    task: 'Cleaning',
    id: Date.now(),
    completed: false
  },
  {
    task: 'Cooking',
    id: Date.now(),
    completed: false
  },
  {
    task: 'Learn React',
    id: Date.now(),
    completed: false
  },
];



class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
    this.state = {
      todo: todoData,
      inputText: ''
    };
  };

  handleChange = event => {
    this.setState({
      inputText: event.target.value
    });
  };

  addTodo = event => {
    event.preventDefault();
    this.setState({
      todo: [...this.state.todo, {task: this.state.inputText, id: Date.now(), completed: false}]
    });

  };

  render() {
    return (
      <div>
        <TodoList list={this.state.todo} />
        <TodoForm 
        inputText={this.state.inputText} 
        handleChange={this.handleChange}
        addTodo={this.addTodo}
        />
      </div>
    );
  }
}

export default App;
