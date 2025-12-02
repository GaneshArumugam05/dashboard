// src/components/SaveCancelButtons.jsx
import React from "react";

const SaveCancelButtons = ({
  onSave,
  onCancel,
  saveText = "Save",
  cancelText = "Cancel",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={onCancel}
        disabled={isLoading || disabled}
        className="flex items-center gap-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all duration-200 font-medium"
      >
        <span>{cancelText}</span>
      </button>
      <button
        onClick={onSave}
        disabled={isLoading || disabled}
        className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <span>{saveText}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SaveCancelButtons;
