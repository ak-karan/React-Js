import React, { useState } from 'react'
import { useTodo } from '../contexts'

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.todo)
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()

  // ✅ FIXED: Update function
  const handleUpdate = () => {
    if (editText && editText.trim()) {
      updateTodo(todo.id, editText.trim())
      setIsEditing(false)
    }
  }


  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditText(todo.todo) 
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdate()
    }
    if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const checkboxId = `todo-${todo.id}`

  return (
    <div className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
      todo.completed 
        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30" 
        : "bg-white/10 border border-white/20 hover:bg-white/20"
    }`}>
      <input
        type='checkbox'
        id={checkboxId}
        name="todo-completed"
        checked={todo.completed || false}
        onChange={() => toggleComplete(todo.id)}
        className="w-5 h-5 rounded-lg cursor-pointer accent-green-500"
      />
      
      {isEditing ? (
        <input
          type="text"
          id={`edit-${todo.id}`}
          name="edit-todo"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={handleKeyPress}
          className="flex-1 px-3 py-1 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          autoFocus
        />
      ) : (
        <span className={`flex-1 text-white text-lg transition-all ${
          todo.completed ? "line-through opacity-60" : ""
        }`}>
          {todo.todo}
        </span>
      )}
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing ? (
          <button
            onClick={() => {
              setEditText(todo.todo)
              setIsEditing(true)
            }}
            className="px-3 py-1 bg-blue-500/80 hover:bg-blue-600 rounded-lg text-white text-sm transition-all"
          >
            ✏️ Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-500/80 hover:bg-green-600 rounded-lg text-white text-sm transition-all"
            >
              💾 Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-500/80 hover:bg-gray-600 rounded-lg text-white text-sm transition-all"
            >
              ❌ Cancel
            </button>
          </>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-3 py-1 bg-red-500/80 hover:bg-red-600 rounded-lg text-white text-sm transition-all"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem