"use client";
type TextInputProps = React.ComponentProps<"input"> & {
  label: string;
  labelSetting?: "vertical" | "horizontal";
  containerWidth?: string;
};

export function TextInput({
  label,
  id,
  className = "",
  containerWidth = "w-full",
  labelSetting = "vertical",
  ...props
}: TextInputProps) {
  const containerClasses = {
    vertical: "flex flex-col space-y-1",
    horizontal: "flex flex-row gap-4 items-center space-y-1",
  };

  return (
    <div className={`${containerClasses[labelSetting]} ${containerWidth}`}>
      <label htmlFor={id} className="text-md font-medium text-slate-700 text-nowrap">
        {label}
      </label>
      <input
        className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-md text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition duration-200 ease-in-out box-border ${className}`}
        {...props}
      />
    </div>
  );
}
