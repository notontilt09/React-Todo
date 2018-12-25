// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js

import React from 'react';
import Todo from './Todo';
import './Todo.css'

const TodoList = props => {
    return (
        <section className="todo-list">
            <h2>Todo List:</h2>
            {props.list.map(taskItem => (
                <Todo 
                key={taskItem.task}
                taskItem={taskItem} />
            ))}
        </section>
    );
};

export default TodoList;
