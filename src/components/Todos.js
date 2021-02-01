import React from "react";
import TodoItem from './TodoItem.js'

const Todos = ({
  todos,
  handleToggleIsDone,
  handleDelete,
  handleSave,
  updateIsEditing

}) => (
  <div className="todos">
    {console.log('todos render')}
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        handleToggleIsDone={handleToggleIsDone}
        handleDelete={handleDelete}
        handleSave={handleSave}
        updateIsEditing={updateIsEditing}
      />
    ))}
  </div>
)

export default Todos;
