import { ContentProvider } from "@/contexts/ContentContext";
import Header from "./components/Header";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-[100vh] w-full bg-white">
      <Header />
      <ContentProvider>
        <main className="h-[94vh] px-8">{children}</main>
        <Toaster />
      </ContentProvider>
    </body>
  );
}
