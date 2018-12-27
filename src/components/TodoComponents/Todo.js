import React from 'react';
import './Todo.css'

const Todo = props => {
    return (
        <div 
            className={`task-item ${props.taskItem.completed}`}
            onClick={() => props.toggleCompleted(props.taskItem.id)}
        >
            <h2>{props.taskItem.number}.</h2>
            <h3>{props.taskItem.task}</h3>
        </div>
    )
};

export default Todo;