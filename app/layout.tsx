import AuthProvider from "@/contexts/AuthContext";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100vh] w-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
