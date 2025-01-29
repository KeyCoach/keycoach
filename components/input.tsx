type InputProps = React.ComponentProps<"input">;
export function Input({ className, ...props }: InputProps) {
  return (
    <>
      <input
        className={`${className || ""} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        {...props}
      />
    </>
  );
}

type LabelProps = React.ComponentProps<"label">;
export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={`block mb-2 text-sm font-medium text-gray-900 ${className || ""}`} {...props}>
      {children}
    </label>
  );
}
