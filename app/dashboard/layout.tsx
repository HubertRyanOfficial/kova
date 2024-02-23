import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-[100vh] w-full">
      <Header />
      {children}
    </body>
  );
}
