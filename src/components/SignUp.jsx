// src/components/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";

const fullNameRegex = /^[a-zA-Z ]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (id, value) => {
    switch (id) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (!fullNameRegex.test(value.trim()))
          return "Full name must be at least 2 letters, letters and spaces only";
        return "";
      case "username":
        if (!value.trim()) return "Username is required";
        if (!usernameRegex.test(value))
          return "Username must be 3-20 characters using letters, numbers or underscore";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!phoneRegex.test(value))
          return "Phone number must be exactly 10 digits";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (!passwordRegex.test(value))
          return "Password must be 8+ characters with letters and numbers";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== form.password) return "Passwords do not match";
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
        alert("Account created successfully!");
        navigate("/login");
      } catch {
        alert("Signup failed. Please try again.");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl"
        noValidate
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Create Account
        </h2>

        {/* Row 1: Full Name + Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <Input
            label="Full Name"
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={onChange}
            error={errors.fullName}
            disabled={isSubmitting}
          />
          <Input
            label="Username"
            id="username"
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={onChange}
            error={errors.username}
            disabled={isSubmitting}
          />
        </div>

        {/* Row 2: Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            error={errors.email}
            disabled={isSubmitting}
          />
          <Input
            label="Phone Number"
            id="phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={form.phone}
            onChange={onChange}
            error={errors.phone}
            disabled={isSubmitting}
          />
        </div>

        {/* Row 3: Password + Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Enter strong password"
            value={form.password}
            onChange={onChange}
            error={errors.password}
            disabled={isSubmitting}
          />
          <Input
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={onChange}
            error={errors.confirmPassword}
            disabled={isSubmitting}
          />
        </div>

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
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center text-blue-600 text-sm">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="hover:underline font-medium"
            disabled={isSubmitting}
          >
            Already have an account? Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
