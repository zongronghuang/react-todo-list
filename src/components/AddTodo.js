import clsx from "clsx";
import React from "react";

const AddTodo = ({ inputValue, getInputValue, addToTodos }) => {
  return (
    <div className={clsx("add-todo", { active: inputValue.length > 0 })}>
      <label className="add-todo-icon icon" htmlFor="add-todo-input"></label>
      <div className="add-todo-input">
        <input
          id="add-todo-input"
          type="text"
          value={inputValue}
          onChange={getInputValue}
          onKeyUp={addToTodos}
          placeholder="新增工作"
        />
      </div>
      <div className="add-todo-action">
        <button className="btn-reset btn-add" onClick={addToTodos}>
          新增
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
