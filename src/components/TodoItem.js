import clsx from 'clsx'
import { useState } from 'react'

const TodoItem = ({
  handleToggleIsDone,
  handleDelete,
  todo,
  handleSave,
  updateIsEditing
}) => {
  const [tempTodo, setTempTodo] = useState(todo.title)

  const handleChange = (e) => {
    setTempTodo(e.target.value)
  }

  const handleKeyDown = (e) => {
    console.log({
      keyCode: e.keyCode,
      key: e.key
    })

    // 按 Enter 儲存新 title
    if (e.keyCode === 13 && tempTodo.length !== 0) {
      handleSave({
        id: todo.id,
        title: tempTodo
      })
    }

    // 按 ESC 還原編輯狀態
    if (e.keyCode === 27) {
      updateIsEditing({
        id: todo.id,
        isEdit: false
      })

      setTempTodo(todo.title)
    }
  }

  return (
    <div
      className={clsx('task-item', {
        done: todo.isDone,
        edit: todo.isEditing
      })}
    >
      { console.log('todoitem render')}
      <div className="task-item-checked">
        <span
          className="icon icon-circle"
          onClick={handleToggleIsDone(todo.id)}
        ></span>
      </div>
      <div
        className="task-item-body"
        onDoubleClick={() => updateIsEditing({ id: todo.id, isEditing: true })}
      >
        <span className="task-item-body-text">{todo.title}</span>
        <input
          className="task-item-body-input"
          type="text"
          placeholder="新增工作"
          value={tempTodo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="task-item-action">
        <button
          className="btn-reset btn-destroy icon"
          onClick={handleDelete(todo.id)}
        > </button>
      </div>
    </div>
  )
}
export default TodoItem