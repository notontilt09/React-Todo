// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js

import React from 'react';
import Todo from './Todo';
import './Todo.css'

const TodoList = props => {
    return (
        <section className="todo-list">
        {/* for each item in the state.todo create a new Todo component */}
            {props.todo.map(taskItem => (
                <Todo 
                key={taskItem.id}
                id={taskItem.id}
                taskItem={taskItem} 
                toggleCompleted={props.toggleCompleted}
                removeTodo={props.removeTodo}
                />
            ))}
        </section>
    );
};

export default TodoList;
