import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'

const App = () => {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }


  const updateTodo = (id, newText) => {
    setTodos((prev) => prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, todo: newText } : prevTodo
    ))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => 
      prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
    ))
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"))
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, toggleComplete, deleteTodo }}>
      <div className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8'>
        <div className="max-w-2xl w-full mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">
              ✨ Todo Manager ✨
            </h1>
            <TodoForm />
            <div className="mt-8 space-y-3">
              {todos.length === 0 ? (
                <p className="text-center text-white/70 py-8">
                  No todos yet! Add your first task above ☝️
                </p>
              ) : (
                todos.map((todo) => (
                  <TodoItem 
                    key={todo.id}
                    todo={todo} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App