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
    <header className="bg-white h-[6vh] px-8 flex flex-row items-center justify-between">
      <Image alt="Kova" src="/kova.svg" width={70} height={70} />
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="hover:scale-105 transition-all cursor-pointer">
              <AvatarImage src={auth.currentUser?.photoURL || undefined} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-8 mt-4">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Create a new project</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
