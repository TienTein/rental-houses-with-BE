import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        type="radio"
        checked={checked}
        className="hidden-input"
        {...field}
        {...props}
      />
      <div className="flex cursor-pointer items-center gap-x-3 font-medium">
        <div
          className={`flex h-7 w-7  items-center justify-center rounded-full border p-1  ${
            checked
              ? " bg-green-700  text-white "
              : "bg-gray-200  text-transparent"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
