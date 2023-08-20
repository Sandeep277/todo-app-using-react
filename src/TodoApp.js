import React, { useState, useEffect } from 'react';
import './todoapp.css';

const TodoApp = () => {
    // State for managing the list of tasks
    const [todos, setTodos] = useState([]);

    // State for capturing the current task being entered
    const [task, setTask] = useState('');

    // Load tasks from LocalStorage when component mounts
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    // Save tasks to LocalStorage whenever todos state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Adding a new task to the list
    const addTodo = () => {
        if (task.trim() !== '') {
            setTodos([...todos, task]);
            setTask('');
        }
    };

    // Editing an existing task
    const handleEdit = (index) => {
        const editedTask = prompt('Edit task:', todos[index]);
        if (editedTask !== null && editedTask.trim() !== '') {
            const updatedTodos = [...todos];
            updatedTodos[index] = editedTask;
            setTodos(updatedTodos);
        }
    };

    // Deleting a task from the list
    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    // ...
    return (
        <div className="todo-app">
            <h1>Todo App</h1>
            <div className="add-todo">
                <input
                    type="text"
                    placeholder="Enter your task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span>{todo}</span>
                        <div>
                            <button onClick={() => deleteTodo(index)}>Delete</button>
                            <button onClick={() => handleEdit(index)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TodoApp;