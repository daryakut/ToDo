import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ITodo } from "../types/data";
import ToDoList from "./ToDoList";
import "../index.css";

interface Props {}

// Начальное состояние с тремя задачами
const initialTodos: ITodo[] = [
  { id: 1, title: "Learn TypeScript", complete: false },
  { id: 2, title: "Master React", complete: false },
  { id: 3, title: "Build a ToDo App", complete: false },
  { id: 4, title: "Explore CSS Animations", complete: false },
  { id: 5, title: "Optimize Performance", complete: false },
  { id: 6, title: "Write Unit Tests", complete: false },
  { id: 7, title: "Deploy the Application", complete: false },
];

// Функция для загрузки задач из localStorage
const loadTodosFromLocalStorage = (): ITodo[] => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : initialTodos;
};

const MyApp: React.FC<Props> = () => {
  // Используем функцию для инициализации состояния
  const [todos, setTodos] = useState<ITodo[]>(loadTodosFromLocalStorage);

  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          complete: false,
        },
      ]);
      setValue("");
    }
  };

  const deleteToDo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleToDo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          complete: !todo.complete,
        };
      })
    );
  };

  // Сохранение todos в localStorage при каждом изменении списка
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="todo-app">
      <h1>My To Do List</h1>
      <div className="todo-input">
        <input
          className="input-field"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ToDoList items={todos} deleteToDo={deleteToDo} toggleToDo={toggleToDo} />
    </div>
  );
};

export default MyApp;
