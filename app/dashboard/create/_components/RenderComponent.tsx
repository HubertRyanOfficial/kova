"use client";

import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Component } from "../../../../lib/content/types";

import cn from "classnames";

function RenderComponent({
  component,
  handleFunction,
}: {
  component: Component;
  handleFunction: (value: string | File | null) => void;
}) {
  let resultComponent = null;

  switch (component.type) {
    case "image":
      resultComponent = (
        <div className="flex items-center justify-between w-full overflow-hidden">
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
            <img src={component.content} className="w-full rounded-xl" />
          )}
          {component.loading && (
            <span className="ml-4 text-xs">
              <Loader color="#000000" size={24} />
            </span>
          )}
        </div>
      );
      break;
    case "title":
      resultComponent = (
        <input
          value={component.content}
          onChange={(e) => handleFunction(e.target.value)}
          placeholder="Title"
          className="w-full font-medium text-4xl border-0 outline-none pl-0 text-black placeholder:text-gray-400 bg-transparent"
        />
      );
      break;
    default:
      resultComponent = (
        <div
          className="text-base w-full h-auto bg-white border-[1px] rounded-md border-gray-200 p-4 outline-none"
          contentEditable
          onInput={(e: any) => {
            e.target?.innerText && handleFunction(String(e.target?.innerHTML));
          }}
        />
      );
      break;
  }

  return <div className={cn("mt-4 overflow-auto")}>{resultComponent}</div>;
}

export default RenderComponent;
