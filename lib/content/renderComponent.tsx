import { Textarea } from "@/components/ui/textarea";
import { Component } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, UploadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export function renderComponent(
  component: Component,
  handleFunction: (value: string | File | null) => void
) {
  if (component.type == "image") {
    return (
      <div className="flex items-center justify-between w-full mt-4">
        {!component.content ? (
          <Input
            type="file"
            onChange={(e) =>
              e.target &&
              e.target.files &&
              e.target.files?.length >= 0 &&
              handleFunction(e.target.files[0])
            }
            accept="image/png, image/jpeg"
            disabled={component.loading}
          />
        ) : (
          <img src={component.content} width={50} height={50} />
        )}
        {component.loading && (
          <span className="ml-4 text-xs">Uploading...</span>
        )}
      </div>
    );
  }

  if (component.type == "title") {
    return (
      <Input
        value={component.content}
        onChange={(e) => handleFunction(e.target.value)}
        className="mt-6"
        placeholder="Title"
      />
    );
  }

  return (
    <Textarea
      value={component.content}
      onChange={(e) => handleFunction(e.target.value)}
      rows={6}
      placeholder="New paragraphy"
      className="mt-4"
    />
  );
}
