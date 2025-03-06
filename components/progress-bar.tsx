type colorVariant = "primary" | "secondary" | "success";

export function ProgressBar({
  status,
  colorVariant = "primary",
}: {
  status?: number;
  colorVariant?: colorVariant;
}) {
  const colorVariantClasses = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500",
    success: "bg-green-500",
  };
  return (
    <div className="bg-gray-300 w-100 rounded-lg h-52">
      <div className={`${colorVariantClasses[colorVariant]} ${status}`}> </div>
    </div>
  );
}
