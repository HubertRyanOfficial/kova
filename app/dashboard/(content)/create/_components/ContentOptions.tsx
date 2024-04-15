"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";

import { FilePlusIcon, LayersIcon } from "@radix-ui/react-icons";
import { FileIcon } from "lucide-react";

import { componentOptions } from "@/lib/content/options";

export default function ContentOptions() {
  const {
    hasComponentsAvailable,
    handleAddNewComponent,
    publishing,
    handlePublish,
  } = useContent();

  return (
    <div className="flex flex-row justify-between items-center w-full mt-4">
      <div className="flex flex-row items-center">
        <FileIcon className="w-6 h-6" />
        <div className="ml-4">
          <h1 className="text-lg">Create content</h1>
          <p className="text-gray-400 text-sm">
            Create a new content and add seo information.
          </p>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mx-4">
              <LayersIcon className="mr-4" />
              New component
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {componentOptions.map((item, index) => (
              <DropdownMenuItem
                key={index}
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
  );
}
