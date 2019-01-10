import React from 'react';
import './Todo.css'

const Todo = props => {
    return (
        <div 
            className={`task-item ${props.taskItem.completed}`}
        >
            <div 
                className={`checkbox ${props.taskItem.completed}`}
                onClick={() => props.toggleCompleted(props.taskItem.id)}
                >
            </div>
            <h2>{props.taskItem.number}.</h2>
            <h3>{props.taskItem.task}</h3>
            <h4 
                onClick={() => props.removeTodo(props.taskItem.id)}
                className="remove">&#10006;
            </h4>
        </div>
    )
};

export default Todo;