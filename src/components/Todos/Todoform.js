import React, { useState} from 'react';
import axios from 'axios';


function TodoForm({ todos, setTodos}) {
    const initialState = {
        id: '',
        message: ''
    }

    const [todo, setTodo] = useState(initialState)
        

      
    const handleChange =(e) => {
        setTodo({
            id: Date.now(),
            message: e.target.value
        })
        

    }
    const handleSubmit =e => {
        e.preventDefault()
        setTodos([todo, ...todos])
        axios.post('http://localhost:8888/todos', todo)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        setTodo(initialState)

    }
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="todo"
            value={todo.message}
            placeholder="Enter your Todo item"
            onChange={handleChange}
            />
            <button type="submit">Add Todo</button>

        </form>
    )
};

export default TodoForm;