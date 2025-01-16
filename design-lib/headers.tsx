type HeaderProps = React.ComponentProps<"h1">;

export function H1({ children, className }: HeaderProps) {
  return <h1 className={`text-4xl ${className || ""}`}>{children}</h1>;
}

export function H2({ children, className }: HeaderProps) {
  return <h2 className={`text-3xl ${className || ""}`}>{children}</h2>;
}

export function H3({ children, className }: HeaderProps) {
  return <h3 className={`text-2xl ${className || ""}`}>{children}</h3>;
}

export function H4({ children, className }: HeaderProps) {
  return <h4 className={`text-xl ${className || ""}`}>{children}</h4>;
}

export function H5({ children, className }: HeaderProps) {
  return <h5 className={`text-lg ${className || ""}`}>{children}</h5>;
}

export function H6({ children, className }: HeaderProps) {
  return <h6 className={`text-base ${className || ""}`}>{children}</h6>;
}
