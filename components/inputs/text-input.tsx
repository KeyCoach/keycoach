export function TextInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  containerWidth = "w-full",
  ...props
}: Readonly<{
  label: string;
  id: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  containerWidth?: string;
}>) {
  return (
    <div className={`flex flex-col space-y-1 ${containerWidth}`}>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition duration-200 ease-in-out box-border ${className}`}
        {...props}
      />
    </div>
  );
}
