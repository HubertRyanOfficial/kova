"use client";

import cn from "classnames";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { useContent } from "@/contexts/ContentContext";

import { Component } from "../../lib/content/types";

function RenderComponent({
  component,
  index,
}: {
  component: Component;
  index: number;
}) {
  const { handleComponentContent, handleTextComponentFocus } = useContent();

  let resultComponent = null;

  switch (component.type) {
    case "image":
      resultComponent = (
        <div
          className="flex items-center justify-between w-full overflow-hidden"
          onFocus={() => handleTextComponentFocus(index)}
        >
          {!component.content ? (
            <Input
              ref={component.ref}
              type="file"
              onChange={(e) =>
                e.target &&
                e.target.files &&
                e.target.files?.length >= 0 &&
                handleComponentContent(e.target.files[0], index)
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
          ref={component.ref}
          value={component.content}
          onChange={(e) => handleComponentContent(e.target.value, index)}
          placeholder="Title"
          className="w-full font-medium text-4xl border-0 outline-none pl-0 text-black placeholder:text-gray-400 bg-transparent"
          onFocus={() => handleTextComponentFocus(index)}
        />
      );
      break;
    default:
      resultComponent = (
        <div
          ref={component.ref}
          className="text-base w-full h-auto bg-white border-[1px] rounded-md border-gray-200 p-4 outline-none"
          contentEditable
          onInput={(e: any) => {
            e.target?.innerText &&
              handleComponentContent(String(e.target?.innerHTML), index);
          }}
          onFocus={() => handleTextComponentFocus(index)}
        />
      );

      break;
  }

  return <div className={cn("mt-4 overflow-auto")}>{resultComponent}</div>;
}

export default RenderComponent;
