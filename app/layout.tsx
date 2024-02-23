import { AuthProvider } from "@/contexts/AuthContext";
import "../styles/globals.css";
import Header from "./dashboard/components/Header";

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
