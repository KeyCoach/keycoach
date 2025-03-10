"use client";

import { MouseEventHandler } from "react";

type TextInputProps = React.ComponentProps<"input"> & {
  label: string;
  labelSetting?: "vertical" | "horizontal";
  containerWidth?: string;
  addon: React.ReactNode;
  addonPosition?: "left" | "right";
  addonClassName?: string;
  addonOnClickAction?: MouseEventHandler<HTMLSpanElement>;
};
export function TextInputWithAddon({
  label,
  id,
  addon,
  addonPosition = "left",
  className = "",
  containerWidth = "w-full",
  addonClassName = "",
  addonOnClickAction = () => {},
  ...props
}: TextInputProps) {
  return (
    <div className={`flex flex-col space-y-1 ${containerWidth}`}>
      <label
        htmlFor={id}
        className="text-md text-nowrap font-medium text-slate-700 dark:text-slate-100"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        {addonPosition === "left" && (
          <span className="absolute inset-y-0 left-0 box-border flex items-center rounded-l-md border border-slate-300 bg-slate-100 px-3 text-slate-500">
            {addon}
          </span>
        )}
        <input
          className={`w-full ${addonPosition === "left" ? "pl-12" : ""} ${
            addonPosition === "right" ? "pr-14" : ""
          } text-md w-full rounded-md border border-slate-300 bg-slate-200 bg-opacity-20 px-3 py-2 text-slate-800 placeholder-slate-400 transition duration-200 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-300 ${className}`}
          id={id}
          {...props}
        />
        {addonPosition === "right" && (
          <span
            className={`border-r-md absolute inset-y-0 right-0 box-border flex items-center rounded-r-md border border-slate-300 bg-slate-100 px-3 text-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 ${addonClassName}`}
            onClick={addonOnClickAction}
          >
            {addon}
          </span>
        )}
      </div>
    </div>
  );
}
