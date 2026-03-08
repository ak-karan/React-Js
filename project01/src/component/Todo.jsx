import { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !date) return;

    setTodos([...todos, { task, date }]);
    setTask("");
    setDate("");
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1 className="text-5xl text-center font-bold uppercase">
        Todo App
      </h1>

      <form onSubmit={handleSubmit} className="text-center mt-5">
        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Enter task"
            className="border rounded px-2 py-1"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <input
            type="date"
            className="border rounded px-2 py-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600">
            Add
          </button>
        </div>
      </form>

      <div className="max-w-xl mx-auto mt-6">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-2 items-center border p-2 mb-2"
          >
            <div>{todo.task}</div>
            <div>{todo.date}</div>
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
