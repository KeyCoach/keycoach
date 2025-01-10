export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: "70vh", height: "70vh" }}>
      <div className="border rounded-2xl p-10" style={{ width: "35rem" }}>
        {children}
      </div>
    </div>
  );
}
