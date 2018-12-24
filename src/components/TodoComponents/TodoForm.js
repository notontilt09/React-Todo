import React from 'react';

const TodoForm = props => {
    return (
        <div>
            <form>
                <input
                    type="text"
                    name="inputText"
                    placeholder="Add new todo item"
                    value={props.inputText}
                    onChange={props.handleChange}
                />
                <button onClick={props.addTodo}>Add Todo Item</button>
                <button onClick={props.clearCompleted}>Clear Completed</button>
            </form>
        </div>
    );
};

export default TodoForm;