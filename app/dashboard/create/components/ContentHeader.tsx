"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FilePlusIcon, TextIcon } from "@radix-ui/react-icons";
import { typeOfContents } from "@/lib/content";
import { useContent } from "@/contexts/ContentContext";

export default function ContentHeader() {
  const { hasComponentsAvailable, title, handleTitle, handleAddNewComponent } =
    useContent();

  return (
    <header className="flex flex-col">
      <h1 className="text-3xl font-semibold">New content</h1>
      <div className="flex items-center justify-between mt-4">
        <Input
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
          placeholder="Main title"
          className="w-[300px]"
        />
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="mx-4">
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
          <Button disabled={!hasComponentsAvailable}>
            <FilePlusIcon className="mr-4" /> Publish
          </Button>
        </div>
      </div>
    </header>
  );
}
