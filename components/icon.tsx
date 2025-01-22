export function Icon({
  src = "public/icons/check.svg",
  alt = "checkmark icon",
  w = "1em",
  h = "1em",
  className
}: Readonly<{
  src?: string;
  alt?: string;
  w?: number | string;
  h?: number | string;
  className?: string;
}>) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        display: "inline-block",
        width: typeof w === "number" ? `${w}px` : w,
        height: typeof h === "number" ? `${h}px` : h,
      }}
    />
  );
};

