import React, { useState, useContext } from "react";
// Ensure the filename and variable name match your context file
import UserContext from "../context/UserContext"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Use the corrected variable name from your import
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for validation or API calls would go here
    setUser({ username, password });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2.5">
      <h2>Login</h2>
      {/* Wrapping in a form enables 'Enter' key submission */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="border p-1"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-1"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-1 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;