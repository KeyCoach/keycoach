import Image from "next/image";

export function Icon({
  src = "public/icons/check.svg",
  alt = "checkmark icon",
  w = 18,
  h = 18,
  className,
}: Readonly<{
  src?: string;
  alt?: string;
  w?: number;
  h?: number;
  className?: string;
}>) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={w}
      height={h}
      style={{
        display: "inline-block",
        width: `${w}px`,
        height: `${h}px`,
      }}
    />
  );
}
