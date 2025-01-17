import React from "react";
import { ITodo } from "../types/data";
import ToDoItem from "./ToDoItem";
import "../index.css"; 

interface Props {
  items: ITodo[];
  toggleToDo: (id: number) => void;
  deleteToDo: (id: number) => void;
}

const ToDoList: React.FC<Props> = ({ items, toggleToDo, deleteToDo }) => {
  return (
    <div className="todo-list">
      {items.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          toggleToDo={toggleToDo}
          deleteToDo={deleteToDo}
        />
      ))}
    </div>
  );
};

export default ToDoList;
