import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipboardCheckIcon } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../apiRequest/authenticationApi";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.warning("Please enter both username and password.");
      return;
    }

    try {
      const res = await loginUser({ username, password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (err) {
      toast.error("Invalid username or password.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#304C7C] px-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white rounded-full p-3 shadow-sm mr-3">
            <ClipboardCheckIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MUKUT ERP</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
