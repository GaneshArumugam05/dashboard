// src/components/Input.jsx
import React from "react";

export function Input({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  icon, // new prop
}) {
  return (
    <div className="mb-4 flex flex-col">
      <label
        htmlFor={id}
        className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value || ""}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200
            ${icon ? "pl-10" : "pl-4"}  ${
            error
              ? "border-red-500 bg-red-50"
              : disabled
              ? "border-gray-300 bg-gray-100 cursor-not-allowed"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
