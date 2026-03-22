import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState('')
  const { addTodo } = useTodo()

  const add = (e) => {
    e.preventDefault()
    if(!todo.trim()) return
    addTodo({ todo: todo.trim(), completed: false })
    setTodo('')
  }

  return (
    <form onSubmit={add} className="flex gap-2">
      <input
        type="text"
        id="todo-input"
        name="todo"
        placeholder="What needs to be done? 📝"
        className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
      >
        ➕ Add
      </button>
    </form>
  );
}

export default TodoForm;