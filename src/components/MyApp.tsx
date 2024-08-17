import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ITodo } from "../types/data";
import ToDoList from "./ToDoList";

interface Props {}

const MyApp: React.FC<Props> = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <div>
        <input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ToDoList items={todos} deleteToDo={deleteToDo} toggleToDo={toggleToDo} />
    </div>
  );
};

export default MyApp;
