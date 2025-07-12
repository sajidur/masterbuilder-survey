// src/pages/admin/RegistrationForm.tsx
import React, { useState } from "react";
import { addUser, UserPayload } from "../apiRequest/authenticationApi";
import { toast } from "react-toastify";

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<UserPayload>({
    username: "",
    email: "",
    password: "",
    userRole: "admin",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser(form);
      toast.success("User registered successfully!");
      setForm({ username: "", email: "", password: "", userRole: "admin" });
    } catch (error) {
      toast.error("Failed to register user.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          name="userRole"
          value={form.userRole}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
