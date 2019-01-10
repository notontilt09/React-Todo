import React from 'react'
import './Todo.css'

const LeftToDo = props => {
    return (
        <div>
            <h3>Tasks remaining: {props.todo.length}</h3>
        </div>
    );
};

export default LeftToDo