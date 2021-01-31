import React from "react";
import clsx from "clsx";

const Todos = ({
  todos,
  deleteTodo,
  toggleTodoIcon,
  toggleTodoEdit,
  saveTodoEdit,
  exitTodoEdit,
  handleTodoChange
}) => {
  return (
    <div className="todos">
      {/* 重複建立 todo item */}
      {todos.map((todo) => (
        <div
          className={clsx(
            "task-item",
            { done: todo.isDone && !todo.isEditing },
            { softDelete: todo.isDeleted },
            { edit: todo.isEditing }
          )}
          key={todo.id}
          id={todo.id}
        >
          <div className="task-item-checked">
            <span
              className="icon icon-checked"
              onClick={toggleTodoIcon(todo.id)}
            ></span>
          </div>

          <div className="task-item-body">
            <span
              className="task-item-body-text"
              title="點兩下進行編輯"
              onDoubleClick={toggleTodoEdit(todo.id)}
            >
              {todo.title}
            </span>
            <input
              className="task-item-body-input"
              type="text"
              value={todo.title}
              placeholder="新增工作"
              //onBlur={toggleTodoEdit(todo.id)}
              onDoubleClick={toggleTodoEdit(todo.id)}
              onKeyUp={saveTodoEdit(todo.id)}
              onKeyDown={exitTodoEdit(todo.id)}
              onChange={handleTodoChange(todo.id)}
            />
          </div>
          <div className="task-item-action">
            <button
              className="btn-reset btn-destroy icon"
              onClick={deleteTodo(todo.id)}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
