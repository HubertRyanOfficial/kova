import { Metadata } from "next";

import { ContentProvider } from "@/contexts/ContentContext";
import { UserProvider } from "@/contexts/UserContext";

import Header from "./_components/Header";
import TabBar from "./_components/Tabbar";

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
    <div className="min-h-[100vh] w-full bg-gray-50">
      <Header />
      <UserProvider>
        <ContentProvider>
          <main className="h-[94vh] flex flex-row">
            <TabBar />
            <div className="w-full bg-white mx-2 mb-2 rounded-xl shadow-lg">
              {children}
            </div>
          </main>
          <Toaster />
        </ContentProvider>
      </UserProvider>
    </div>
  );
}
