import './App.scss';

import React from "react";
import { useState } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Todos from './components/Todos.js'
import AddTodo from './components/AddTodo.js'
import { v4 as uuidv4 } from "uuid";

const todosDefault = [
  {
    id: uuidv4(),
    title: "Learn React",
    isDone: false,
    isEditing: false
  },
  {
    id: uuidv4(),
    title: "Become a frontend developer",
    isDone: false,
    isEditing: false
  },
  {
    id: uuidv4(),
    title: "do something",
    isDone: false,
    isEditing: false
  }
];

export default function App() {
  const [inputValue, setInputValue] = useState(""); // controlled component 專用 state
  const [todos, setTodos] = useState(todosDefault)

  const numOfTodos = todos.filter(todo => !todo.isDone).length

  const handleAddTodo = () => {
    if (inputValue.length === 0) {
      return
    }

    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          title: inputValue,
          isDone: false,
          isEditing: false
        }
      ]
    })

    setInputValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') {
      return
    }

    if (inputValue.length === 0) {
      return
    }

    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          title: inputValue
        }
      ]
    })

    setInputValue('')
  }

  const handleToggleIsDone = (id) => () => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id !== id) {
        return todo
      }

      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  // controlled component 的 onChange handler
  const handleChange = (e) => {
    setInputValue(e.target.value)
    console.log('input', e.target.value)
  }

  const handleDelete = (id) => () => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const updateIsEditing = ({ id, isEditing }) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id !== id) {
        return todo
      }

      return {
        ...todo,
        isEditing
      }
    }))
  }

  const handleSave = ({ id, title }) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id !== id) {
        return todo
      }

      return {
        ...todo,
        title,
        isEditing: false
      }
    }))
  }

  return (
    <div className="app">
      <Header />
      {console.log('app render')}
      <AddTodo
        inputValue={inputValue}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        handleAddTodo={handleAddTodo}
      />
      <Todos
        todos={todos}
        handleDelete={handleDelete}
        handleToggleIsDone={handleToggleIsDone}
        handleSave={handleSave}
        updateIsEditing={updateIsEditing}
      />

      <Footer numOfTodos={numOfTodos} />
    </div>
  )
}
