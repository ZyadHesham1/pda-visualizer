import React from "react";

type PDAInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
};

const Input: React.FC<PDAInputProps> = ({
  value,
  onChange,
  label = "Formal PDA Description",
  placeholder = "Enter PDA formal description here..."
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={8}
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 font-mono p-2 resize-y"
      />
    </label>
  </div>
);

export default Input;