type Variant = "primary" | "secondary" | "danger" | "warning";

export default function Button({
  children,
  variant = "primary",
}: Readonly<{
  children: React.ReactNode;

  variant?: Variant;
}>) {
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-700 text-white",
  };
  return (
    <button className={`${variantClasses[variant]}  font-bold py-2 px-4 rounded`}>
      {children}
    </button>
  );
}
