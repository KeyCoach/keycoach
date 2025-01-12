export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  justify-center">
      <div className=" mt-12 border rounded-2xl p-10" style={{ width: "35rem" }}>
        {children}
      </div>
    </div>
  );
}
