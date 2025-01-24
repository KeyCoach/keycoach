export function TextInputWithAddon({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  addon,
  addonPosition = "left",
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
  addon: string; // The addon text (e.g., @, $, .com)
  addonPosition?: "left" | "right";
  className?: string;
  containerWidth?: string;
}>) {
  return (
    <div className={`flex flex-col space-y-1 ${containerWidth}`}>
      <label htmlFor={id} className="text-md font-medium text-slate-700">
        {label}
      </label>
      <div className="relative flex items-center">
        {addonPosition === "left" && (
          <span className="absolute inset-y-0 left-0 flex items-center bg-slate-100 border border-slate-300 px-3 text-slate-500 box-border rounded-l-md">
            {addon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${addonPosition === "left" ? "pl-12" : ""} ${
            addonPosition === "right" ? "pr-14" : ""
          } rounded-md border border-slate-300 bg-white px-2 py-2 text-md text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition duration-200 ease-in-out box-border ${className}`}
          {...props}
        />
        {addonPosition === "right" && (
          <span className="absolute inset-y-0 right-0 flex items-center bg-slate-100 border-2 border-slate-300 px-3 text-slate-500 box-border">
            {addon}
          </span>
        )}
      </div>
    </div>
  );
}
