// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (id, value) => {
    switch (id) {
      case "identifier":
        if (!value.trim()) return "Username, Email or Phone is required";
        if (
          emailRegex.test(value.trim()) ||
          phoneRegex.test(value) ||
          usernameRegex.test(value)
        )
          return "";
        return "Enter valid Username (3-20 chars), Email or 10-digit Phone number";
      case "password":
        if (!value) return "Password is required";
        if (!passwordRegex.test(value))
          return "Password must be 8+ characters with letters and numbers";
        return "";
      default:
        return "";
    }
  };

  const validate = () => {
    const errs = {};
    Object.entries(form).forEach(([key, value]) => {
      const errorMsg = validateField(key, value);
      if (errorMsg) errs[key] = errorMsg;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    const errorMsg = validateField(id, value);
    setErrors({ ...errors, [id]: errorMsg });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validate()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(`Logged in successfully with ${form.identifier}!`);
        if (onLoginSuccess) onLoginSuccess();
        navigate("/dashboard");
      } catch {
        alert("Login failed. Please try again.");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
        noValidate
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Sign In
        </h2>

        <Input
          label="Username or Email or Phone"
          id="identifier"
          type="text"
          placeholder="Enter username, email or phone number"
          value={form.identifier}
          onChange={onChange}
          error={errors.identifier}
          disabled={isSubmitting}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 mb-6 flex items-center justify-center shadow-lg text-lg font-medium h-12"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="flex justify-between text-blue-600 text-sm">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="hover:underline font-medium"
            disabled={isSubmitting}
          >
            Forgot Password?
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="hover:underline font-medium"
            disabled={isSubmitting}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
