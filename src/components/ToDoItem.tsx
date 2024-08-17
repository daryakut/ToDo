import { ITodo } from "../types/data";

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
    <div>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => {
          toggleToDo(todo.id);
        }}
      />
      <span style={{ display: "inline-block", margin: "0 10px" }}>
        {todo.title}
      </span>
      <button
        onClick={() => {
          deleteToDo(todo.id);
        }}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "red",
          cursor: "pointer",
        }}
      >
        {"❌"}
      </button>
    </div>
  );
};

export default ToDoItem;
