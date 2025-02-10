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
    vertical: "flex flex-col space-y-2",
    horizontal: "flex flex-row gap-4 items-center space-y-1",
  };

  return (
    <div className={`${containerClasses[labelSetting]} ${containerWidth}`}>
      <label
        htmlFor={id}
        className="text-md text-nowrap font-medium text-slate-700 dark:text-slate-100"
      >
        {label}
      </label>
      <input
        className={`text-md w-full rounded-md border border-slate-300 bg-slate-200 bg-opacity-20 px-3 py-2 text-slate-800 placeholder-slate-400 transition duration-200 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-300 ${className}`}
        {...props}
      />
    </div>
  );
}
