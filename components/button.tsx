type Variant = "centered" | "previous-nav" | "next-nav" | "icon";

export function Button({variant = "centered", bgColor = "blue-500"
}: Readonly<{
    variant?: Variant;
    bgColor?: string;
}>) {
    const buttonVariants = {
        centered: "grid place-items-center",
        "previous-nav": "flex row-reverse",
        "next-nav": "flex",
        icon: "grid place-items-center",
    };
    return (
        <button className={``}>
            Button
        </button>
    );
}
