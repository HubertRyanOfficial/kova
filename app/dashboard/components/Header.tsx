"use client";

import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase-config";
import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    await signOut(auth);
    router.push("/");
  }, []);

  return (
    <header className="bg-gray-50 h-[6vh] px-8 flex flex-row items-center justify-between">
      <Image
        onClick={() => router.push("/dashboard")}
        alt="Kova"
        src="/kova.svg"
        width={70}
        height={70}
      />
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="hover:scale-105 transition-all cursor-pointer">
              <AvatarImage src={auth.currentUser?.photoURL || undefined} />
              <AvatarFallback>
                {auth.currentUser?.displayName?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-8 mt-4">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/create")}>
              Create a new content
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
