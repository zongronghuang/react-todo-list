import React from "react";
import TodoItem from './TodoItem.js'

// JSON server APIs
const baseURL = 'http://localhost:3001'

export const getTodos = () => {
  return fetch(`${baseURL}/todos`).then(res => res.json())
}

export const createTodo = (payload) => {

}

export const deleteTodo = () => {

}

export const patchTodo = () => {

}




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
