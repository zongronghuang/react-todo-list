import './App.scss';

import React from "react";
import TodoApp from './views/TodoApp.js'
import Login from './views/Login.js'
import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'

const App = () => {
  const [currentPage, setCurrentPage] = useState('Login')
  const isLogin = false
  const isAtLogin = useRouteMatch('/login')

  if (!isLogin && !isAtLogin) {
    return <Redirect to="/login" />
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          {isLogin ? <Redirect to="/todos" /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/todos">
          <TodoApp />
        </Route>
      </Switch>
    </div>
  )
}

export default App