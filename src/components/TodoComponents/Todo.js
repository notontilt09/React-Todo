import React from 'react';
import './Todo.css'

const Todo = props => {
    return (
        <div className="task-item">{props.taskItem.task}</div>
    )
};

export default Todo;