import React from 'react';
import './Todo.css'

const TodoForm = props => {
    return (
        <div className="form">
            <h2>todos</h2>
            <form>
                <input
                    type="text"
                    name="inputText"
                    className="user-input"
                    placeholder="Add new todo item"
                    autoComplete='off'
                    value={props.inputText}
                    onChange={props.handleChange}
                />
                <button className='input-btn' onClick={props.addTodo}>Add Todo Item</button>
                <button className='input-btn' onClick={props.clearCompleted}>Clear Completed</button>
            </form>
        </div>
    );
};

export default TodoForm;