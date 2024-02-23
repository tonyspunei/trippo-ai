export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-6xl mx-auto w-full px-4">
      {children}
    </div>
  );
}