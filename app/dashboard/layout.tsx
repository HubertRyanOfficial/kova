import { Metadata } from "next";

import Header from "./_components/Header";

import { Toaster } from "@/components/ui/toaster";
import { ContentProvider } from "@/contexts/ContentContext";
import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[100vh] w-full bg-gray-50">
      <Header />
      <UserProvider>
        <ContentProvider>
          <main className="h-[94vh] px-8">{children}</main>
          <Toaster />
        </ContentProvider>
      </UserProvider>
    </div>
  );
}
