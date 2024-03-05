import AuthProvider from "@/contexts/AuthContext";
import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kova | Free CMS to everyone",
  description: "Make your content to everyone without problems and pay.",
};

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
