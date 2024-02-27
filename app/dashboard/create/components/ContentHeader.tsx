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
import { typeOfContents } from "@/lib/content";
import { useContent } from "@/contexts/ContentContext";
import { Label } from "@/components/ui/label";

export default function ContentHeader() {
  const {
    hasComponentsAvailable,
    title,
    handleTitle,
    handleAddNewComponent,
    publishing,
    handlePublish,
  } = useContent();

  return (
    <section className="flex flex-col">
      <h1 className="text-base font-regular text-gray-400">New content</h1>
      <div className="flex items-center justify-between mt-4">
        <input
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
          placeholder="Main title"
          className="w-[300px] font-medium text-4xl border-0 outline-none pl-0 text-black placeholder:text-black"
          autoFocus
        />
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mx-4">
                <LayersIcon className="mr-4" />
                New component
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {typeOfContents.map((item) => (
                <DropdownMenuItem
                  onClick={() => handleAddNewComponent(item.type)}
                >
                  {item.icon}
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => handlePublish()}
            disabled={!hasComponentsAvailable || publishing}
          >
            <FilePlusIcon className="mr-4" />{" "}
            {!publishing ? "Publish" : "Publishing"}
          </Button>
        </div>
      </div>
    </section>
  );
}
