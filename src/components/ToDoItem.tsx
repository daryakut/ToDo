import { ITodo } from "../types/data";
import "../index.css"; 

interface ToDoItemProps {
  todo: ITodo;
  toggleToDo: (id: number) => void;
  deleteToDo: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  todo,
  toggleToDo,
  deleteToDo,
}) => {
  return (
    <div className={`todo-item ${todo.complete ? "completed" : ""}`}>
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={todo.complete}
        onChange={() => {
          toggleToDo(todo.id);
        }}
      />
      <span className="todo-title">{todo.title}</span>
      <button
        className="delete-button"
        onClick={() => {
          deleteToDo(todo.id);
        }}
      >
        {"❌"}
      </button>
    </div>
  );
};

export default ToDoItem;
