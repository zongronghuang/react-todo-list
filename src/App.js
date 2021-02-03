import './App.scss';

import React from "react";
import TodoApp from './views/TodoApp.js'
import Login from './views/Login.js'
import { useState, useEffect } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState('Login')

  return (
    <div className="app">
      {currentPage === 'Login' && <Login />}
      {currentPage === 'TodoApp' && <TodoApp />}
    </div>
  )
}

export default App