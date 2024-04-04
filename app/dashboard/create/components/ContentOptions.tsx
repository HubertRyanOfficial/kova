"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilePlusIcon, LayersIcon } from "@radix-ui/react-icons";
import { useContent } from "@/contexts/ContentContext";
import { componentOptions } from "@/lib/content/options";

export default function ContentOptions() {
  const {
    hasComponentsAvailable,
    handleAddNewComponent,
    publishing,
    handlePublish,
  } = useContent();

  return (
    <div className="flex justify-end items-center w-full mt-8">
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
  );
}
