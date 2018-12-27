import React from 'react';
import './Todo.css'

const Todo = props => {
    return (
        <div 
            className={`task-item ${props.taskItem.completed}`}
            onClick={() => props.toggleCompleted(props.taskItem.id)}
        >
            {props.taskItem.task}
        </div>
    )
};

export default Todo;