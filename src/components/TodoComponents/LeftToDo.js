import React from 'react'
import './Todo.css'

const LeftToDo = props => {
    return (
        <div className="bottom">
            <h3 className="remaining">Tasks remaining: {props.todo.length}</h3>
            <button className="delete-all" onClick={() => props.deleteAll()}>Delete All Tasks</button>
        </div>
    );
};

export default LeftToDo