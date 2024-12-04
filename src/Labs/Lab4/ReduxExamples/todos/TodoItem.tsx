import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo }: { todo: any })  {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item ">
      <button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click" type = "button" className="btn btn-danger mx-2 float-end" > Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"   type = "button" className="btn btn-primary mx-2 float-end"> Edit </button>
      {todo.title}
    </li>
  );
}
