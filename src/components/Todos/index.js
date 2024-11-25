import React, { useState, useEffect } from 'react';
import TodoForm from './Todoform';
import TodoList from './TodoList';
import axios from 'axios';

function App() {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8888/todos') // Use `http` for localhost
            .then((res) => {
                console.log("Fetched Todos:", res.data);
                setTodoList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching todos:", err);
            });
    }, []);

    // Delete Handler
    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8888/todos/${id}`)
            .then((res) => {
                console.log("Deleted Todo:", res);
                setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));
            })
            .catch((err) => {
                console.error("Error deleting todo:", err);
            });
    };

    // Update Handler
    const updateHandler = (todo) => {
        axios.put(`http://localhost:8888/todos/${todo.id}`, todo) // Add a comma between URL and data
            .then((res) => {
                console.log("Updated Todo:", res);
                setTodoList((prevTodoList) =>
                    prevTodoList.map((item) => (item.id === todo.id ? { ...item, message: todo.message } : item))
                );
            })
            .catch((err) => {
                console.error("Error updating todo:", err);
            });
    };

    return (
        <div>
            <h1>Todo App</h1>
            <TodoForm todos={todoList} setTodos={setTodoList} />
            <TodoList todos={todoList} deleteHandler={deleteHandler} updateHandler={updateHandler} />
        </div>
    );
}

export default App;
