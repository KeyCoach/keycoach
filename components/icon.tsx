import Image from "next/image";

export function Icon({
  src = "public/icons/check.svg",
  alt = "checkmark icon",
  w = 24,
  h = 24,
}: Readonly<{
  src?: string;
  alt?: string;
  w?: number;
  h?: number;
}>) {
  return <Image src={src} alt={alt} width={w} height={h} />;
};

