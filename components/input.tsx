import React from "react";

type InputProps = React.ComponentProps<"input"> & {
  className?: string;
};

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <>
      <input
        className={`${className || ""} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        {...props}
      />
    </>
  );
};

type LabelProps = React.ComponentProps<"label"> & {
  className?: string;
};
export const Label: React.FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label className={`block mb-2 text-sm font-medium text-gray-900 ${className || ""}`} {...props}>
      {children}
    </label>
  );
};
