export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div
        className="rounded-2xl bg-slate-100 shadow-slate-300 dark:bg-slate-900 dark:shadow-slate-700"
        style={{ width: "35rem" }}
      >
        {children}
      </div>
    </div>
  );
}
