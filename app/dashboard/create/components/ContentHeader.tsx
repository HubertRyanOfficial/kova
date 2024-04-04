"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FilePlusIcon, LayersIcon } from "@radix-ui/react-icons";
import { componentOptions } from "@/lib/content/options";
import { useContent } from "@/contexts/ContentContext";
import { Label } from "@/components/ui/label";

export default function ContentHeader() {
  const { title, handleTitle } = useContent();

  return (
    <section className="flex flex-col bg-white py-4 px-6 rounded-md shadow-sm border-[1px] border-gray-200">
      <input
        value={title}
        onChange={(e) => handleTitle(e.target.value)}
        placeholder="Main title"
        className="w-full font-medium text-2xl border-0 outline-none pl-0 text-black placeholder:text-gray-400"
        autoFocus
      />
    </section>
  );
}
