

export function TextInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  className,
  ...props
}: Readonly<{
  label: string;
  id: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  value: string;
  className?: string;
}>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        className={className}
        {...props}
      />
    </div>
  );
}