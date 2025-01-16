type Variant = "primary" | "secondary" | "danger" | "warning";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
};
export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-700 text-white",
  };
  return (
    <button
      className={`${className || ""} ${variantClasses[variant]} font-bold py-2 px-4 rounded`}
      {...props}
    >
      {children}
    </button>
  );
}
