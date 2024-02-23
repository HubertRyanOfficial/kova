import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-[100vh] w-full">
      <Header />
      <main className="h-[94vh] px-8">{children}</main>
    </body>
  );
}
