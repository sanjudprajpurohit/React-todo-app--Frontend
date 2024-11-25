import React, { useState } from 'react';

function Todo({ todo, deleteHandler, updateHandler }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState();

    const updateTodoState = (e) => {
        // Update the state with the value entered in the input
        setUpdatedTodo({
            id: todo.id,
            message: e.target.value,
        });
    };

    const updateAndReset = (input, e) => {
        e.preventDefault();
        // Call updateHandler with the input
        updateHandler(input);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? 
                <form onSubmit={e=> updateAndReset(updatedTodo, e)}>
                    <input
                        type="text"
                        defaultValue={todo.message}
                        onChange={updateTodoState}
                    />
                </form>
             : 
                // Corrected: Render the actual todo message
                <p onDoubleClick={() => setIsEditing(true)}>{todo.message}</p>
            }
            <button onClick={() => deleteHandler(todo.id)}>X</button>
        </div>
    );
}

export default Todo;

