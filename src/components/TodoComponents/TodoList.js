// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js

import React from 'react';
import Todo from './Todo';
import './Todo.css'

const TodoList = props => {
    return (
        <section className="todo-list">
        {/* for each item in the state.todo create a new Todo component */}
            {props.list.map(taskItem => (
                <Todo 
                key={taskItem.id}
                taskItem={taskItem} 
                toggleCompleted={props.toggleCompleted}
                />
            ))}
        </section>
    );
};

export default TodoList;
