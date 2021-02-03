import '../App.scss';

import React from "react";

import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Todos from '../components/Todos.js'
import AddTodo from '../components/AddTodo.js'

import { getTodos, createTodo, deleteTodo, patchTodo } from '../api/todos.js'

export default function App() {
  const [inputValue, setInputValue] = useState(""); // controlled component 專用 state
  const [todos, setTodos] = useState([])

  const numOfTodos = todos.filter(todo => !todo.isDone).length

  // 按下「新增」按鍵後儲存 todo
  const handleAddTodo = async () => {
    try {
      if (inputValue.length === 0) {
        return
      }

      const data = await createTodo({
        title: inputValue,
        isDone: false,
      })

      setTodos(prevTodos => {
        return [
          ...prevTodos,
          {
            ...data,
            isEditing: false
          }
        ]
      })

      setInputValue('')
    } catch (error) {
      console.log('Failed to create a todo', error)
    }
  }

  // 按下 Enter 後儲存
  const handleKeyPress = async (e) => {
    try {
      if (e.key !== 'Enter' || inputValue.length === 0) {
        return
      }

      const data = await createTodo({
        title: inputValue,
        isDone: false
      })

      setTodos(prevTodos => {
        return [
          ...prevTodos,
          {
            ...data,
            isEditing: false
          }
        ]
      })

      setInputValue('')
    } catch (error) {
      console.log('Failed to create a todo', error)
    }
  }

  // 改變 todo 完成狀態
  const handleToggleIsDone = (id) => async () => {
    try {
      const currentTodo = todos.find(todo => todo.id === id)
      await patchTodo({
        id,
        isDone: !currentTodo.isDone
      })

      setTodos(prevTodos => prevTodos.map(todo => {
        if (todo.id !== id) {
          return todo
        }

        return {
          ...todo,
          isDone: !todo.isDone
        }
      }))
    } catch (error) {
      console.log('Failed to change the todo done status', error)
    }
  }

  // controlled component 的 onChange handler
  const handleChange = (e) => {
    setInputValue(e.target.value)
    console.log('input', e.target.value)
  }

  // 刪除 todo
  const handleDelete = (id) => async () => {
    try {
      await deleteTodo(id)

      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    } catch (error) {
      console.log('Failed to delete the todo', error)
    }
  }

  // 更新 isEditing 狀態
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

  // 儲存 todo 變更
  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      })

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
    } catch (error) {
      console.log('Failed to save todo change', error)
    }
  }

  useEffect(() => {
    getTodos().then(todos => {
      setTodos(
        todos.map(todo => ({
          ...todo,
          isEditing: false
        }))
      )
    })
  }, [])

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
