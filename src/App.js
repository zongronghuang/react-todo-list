import './App.scss';

import React from "react";
import { useState } from "react";
import Header from "./components/Header.js";
import AddTodo from "./components/AddTodo.js";
import Todos from "./components/Todos.js";
import Footer from "./components/Footer.js";
import { v4 as uuidv4 } from "uuid";

const defaultTodos = [
  {
    id: uuidv4(),
    title: "Learn React",
    titleCache: "Learn React",
    isDone: false,
    isDeleted: false,
    isEditing: false
  },
  {
    id: uuidv4(),
    title: "Do React",
    titleCache: "Do React",
    isDone: true,
    isDeleted: false,
    isEditing: false
  },
  {
    id: uuidv4(),
    title: "Make a React Project",
    titleCache: "Make a React Project",
    isDone: true,
    isDeleted: true,
    isEditing: false
  }
];

export default function App() {
  let [todos, setTodos] = useState(defaultTodos);
  let [inputValue, setInputValue] = useState("");
  const numOfRemainingTodos = todos.filter(
    (todo) => !todo.isDone && !todo.isDeleted
  ).length;

  // 取得新 todo 的值
  const getInputValue = (e) => {
    setInputValue(e.target.value);
  };

  // 把新 todo 加到 todos
  const addToTodos = (e) => {
    if (e.key !== "Enter" && e.target.tagName !== "BUTTON") {
      return;
    }

    const newTodos = [
      ...todos,
      {
        id: uuidv4(),
        title: inputValue,
        titleCache: inputValue,
        isDone: false,
        isDeleted: false,
        isEditing: false
      }
    ];
    setTodos(newTodos);
    setInputValue("");
  };

  // 軟性刪除 todo
  const deleteTodo = (todoId) => (e) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isDeleted: true
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  // 切換 todo 的完成狀態
  // 編輯中的 todo 不能更改 icon
  const toggleTodoIcon = (todoId) => (e) => {
    const updatedTodos = todos.map((todo) => {
      if (todoId === todo.id && !todo.isEditing) {
        return {
          ...todo,
          isDone: !todo.isDone
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  // 連點兩下來切換 edit 狀態
  const toggleTodoEdit = (todoId) => (e) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isEditing: !todo.isEditing
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  // 儲存編輯過的 todo title 和 todo title cache
  const saveTodoEdit = (todoId) => (e) => {
    // 按 Enter 鍵才能執行
    console.log("event", e);
    if (e.keyCode !== 13) {
      return;
    }

    if (!e.target.value.length) {
      return alert("內容不可為空白");
    }

    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: e.target.value,
          titleCache: e.target.value,
          isEditing: false
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const exitTodoEdit = (todoId) => (e) => {
    // 只有按下 ESC 鍵才會執行
    if (e.keyCode !== 27) {
      return;
    }

    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isEditing: false,
        };
      }

      return todo;
    }))
  };

  // 即時更新 todo input 欄位變動 (for controlled components)
  const handleTodoChange = (todoId) => (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          titleCache: e.target.value
        };
      })
    );
  };

  return (
    <div className="App">
      <div className="app">
        <Header />
        <AddTodo
          inputValue={inputValue}
          getInputValue={getInputValue}
          addToTodos={addToTodos}
        />
        <Todos
          todos={todos}
          deleteTodo={deleteTodo}
          toggleTodoIcon={toggleTodoIcon}
          toggleTodoEdit={toggleTodoEdit}
          saveTodoEdit={saveTodoEdit}
          exitTodoEdit={exitTodoEdit}
          handleTodoChange={handleTodoChange}
        />
        <Footer numOfRemainingTodos={numOfRemainingTodos} />
      </div>
    </div>
  );
}
