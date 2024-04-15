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
import { FileIcon, CheckIcon } from "lucide-react";

import { componentOptions } from "@/lib/content/options";

interface ContentOptionsProps {
  title: string;
  description: string;
}

export default function ContentOptions({
  title,
  description,
}: ContentOptionsProps) {
  const {
    hasComponentsAvailable,
    handleAddNewComponent,
    publishing,
    handlePublish,
    isEditing,
  } = useContent();

  return (
    <div className="flex flex-row justify-between items-center w-full mt-4">
      <div className="flex flex-row items-center">
        <FileIcon className="w-6 h-6" />
        <div className="ml-4">
          <h1 className="text-lg">{title}</h1>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mx-4">
              <LayersIcon className="mr-4 w-5 h-5" />
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
          {!isEditing ? (
            <FilePlusIcon className="mr-4" />
          ) : (
            <CheckIcon className="mr-4 w-3.5 h-3.5" />
          )}{" "}
          {!publishing
            ? !isEditing
              ? "Publish"
              : "Save changes"
            : !isEditing
            ? "Publishing"
            : "Saving"}
        </Button>
      </div>
    </div>
  );
}
