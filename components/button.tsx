import { Icon } from "@/components/icon";

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?: "default" | "previous-nav" | "next-nav" | "icon";
}

export function Button({
  className,
  children,
  disabled,
  loading,
  variant = "default",
}: ButtonProps) {
  const variantClasses = {
    default: "grid place-items-center",
    "previous-nav": "flex items-center flex-row-reverse gap-2",
    "next-nav": "flex items-center row gap-2",
    icon: "grid place-items-center",
  };

  let dynamicClass = className ? className : "bg-cerulean-500 text-white hover:bg-cerulean-700";

  dynamicClass = dynamicClass.concat(
    ` ${variantClasses[variant]} px-4 py-2 rounded-md transition-colors duration-200 font-medium`
  );

  // TODO: adjust these classes
  if (disabled) {
    dynamicClass = dynamicClass.concat(" bg-gray-300 cursor-not-allowed");
  }

  // TODO: replace the children with a spinner
  if (loading) {
    dynamicClass = dynamicClass.concat(" bg-gray-300 cursor-wait");
  }

  if (variant.includes("nav")) {
    const navIconName = variant.includes("previous") ? "chevron-left" : "chevron-right";
    children = (
      <>
        {children}
        <Icon src="icons/button-vertical-divider.svg" alt="chevron left icon" w={"1rem"} h={"1rem"} />
        <Icon src={`icons/${navIconName}.svg`} alt="chevron right icon" w={"1rem"} h={"1rem"} />
      </>
    );
  }

  return <button className={dynamicClass}>{children}</button>;
}
